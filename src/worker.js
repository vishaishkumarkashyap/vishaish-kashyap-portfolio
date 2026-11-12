/**
 * Cloudflare Worker for the portfolio.
 *
 *  1. Serves the static site straight from the uploaded assets.
 *  2. Exposes /api/insights, which returns live Instagram + YouTube numbers.
 *     The Instagram token stays in a Worker secret, so it is never visible
 *     in the browser and never ends up in the page source.
 *
 * Secrets (set with `npx wrangler secret put <NAME>`):
 *   IG_TOKEN       long-lived Meta Graph API token
 *   IG_USER_ID     numeric Instagram user id
 *   YT_API_KEY     public YouTube Data API key
 *   YT_CHANNEL_ID  your "UC..." channel id
 *
 * Every credential is optional. If one is missing that platform is skipped
 * and the static numbers in assets/js/config.js are used instead.
 */

const GRAPH = 'https://graph.facebook.com/v21.0';
const YOUTUBE = 'https://www.googleapis.com/youtube/v3';

const CACHE_TTL_SECONDS = 1800; // 30 minutes

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    if (url.pathname === '/api/insights') {
      return handleInsights(request, env, ctx);
    }

    // Everything else is the static site.
    return env.ASSETS.fetch(request);
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

async function handleInsights(request, env, ctx) {
  const cache = caches.default;
  const cacheKey = new Request(new URL('/api/insights', request.url).toString());

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const [ig, yt] = await Promise.all([
    instagram(env).catch(() => null),
    youtube(env).catch(() => null)
  ]);

  const body = {
    updated: new Date().toISOString(),
    combined: {
      views: ig?.views ?? null,
      interactions: ig?.interactions ?? null,
      profileViews: ig?.profileViews ?? null
    },
    instagram: ig ?? {},
    youtube: yt ?? {}
  };

  const res = new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': `public, max-age=${CACHE_TTL_SECONDS}`,
      ...corsHeaders()
    }
  });

  ctx.waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}

/* ── Instagram ─────────────────────────────────────────────────────────── */
async function instagram(env) {
  const token = (env.IG_TOKEN || '').trim();
  const id = (env.IG_USER_ID || '').trim();
  if (!token || !id) return null;

  const out = {
    followers: null,
    views: null,
    interactions: null,
    profileViews: null,
    mediaCount: null
  };

  // Account level: followers and post count.
  try {
    const res = await fetch(
      `${GRAPH}/${id}?fields=followers_count,media_count&access_token=${encodeURIComponent(token)}`
    );
    const json = await res.json();
    if (!json.error) {
      out.followers = json.followers_count ?? null;
      out.mediaCount = json.media_count ?? null;
    }
  } catch (_) { /* keep going, insights may still work */ }

  // Account insights: views, reach, interactions, profile visits.
  try {
    const metrics = ['views', 'reach', 'profile_views', 'total_interactions'];
    const res = await fetch(
      `${GRAPH}/${id}/insights?metric=${metrics.join(',')}` +
      `&period=day&metric_type=total_value&access_token=${encodeURIComponent(token)}`
    );
    const json = await res.json();
    if (!json.error && Array.isArray(json.data)) {
      const sum = (name) =>
        json.data
          .filter((row) => row.name === name)
          .reduce((total, row) =>
            total + (row.values || []).reduce((s, v) => s + (v.value || 0), 0), 0);

      const views = sum('views');
      const reach = sum('reach');
      out.views = views || reach || null;
      out.interactions = sum('total_interactions') || null;
      out.profileViews = sum('profile_views') || null;
    }
  } catch (_) { /* metrics need the instagram_manage_insights scope */ }

  return out;
}

/* ── YouTube ───────────────────────────────────────────────────────────── */
async function youtube(env) {
  const key = (env.YT_API_KEY || '').trim();
  const id = (env.YT_CHANNEL_ID || '').trim();
  if (!key || !id) return null;

  const res = await fetch(
    `${YOUTUBE}/channels?part=statistics&id=${encodeURIComponent(id)}&key=${encodeURIComponent(key)}`
  );
  const json = await res.json();
  const st = json?.items?.[0]?.statistics;
  if (!st) return null;

  return {
    subscribers: st.subscriberCount != null ? Number(st.subscriberCount) : null,
    views: st.viewCount != null ? Number(st.viewCount) : null,
    videos: st.videoCount != null ? Number(st.videoCount) : null,
    watchHours: null,
    monthlyAudience: null
  };
}
