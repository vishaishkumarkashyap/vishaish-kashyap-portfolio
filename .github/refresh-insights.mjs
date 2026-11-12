/**
 * Refreshes data/insights.json with fresh Instagram + YouTube numbers.
 *
 * Run by .github/workflows/insights.yml on a schedule (every 4 hours).
 * You can also run it locally:  node .github/refresh-insights.mjs
 *
 * Required secrets (GitHub repo > Settings > Secrets and variables > Actions):
 *   YT_API_KEY      public YouTube Data API key
 *   YT_CHANNEL_ID   your channel id, the "UC...." from your channel URL
 *   IG_USER_ID      your Instagram user id (numeric)
 *   IG_TOKEN        a long-lived Meta Graph API token
 *
 * Everything is optional. If a secret is missing that platform is skipped and
 * the numbers in config.js are used instead.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'data', 'insights.json');
const GRAPH = 'https://graph.facebook.com/v21.0';
const YT = 'https://www.googleapis.com/youtube/v3';

const env = (k) => (process.env[k] || '').trim();

async function jget(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'insights-bot/1.0' } });
  if (!res.ok) throw new Error(`${res.status} ${await res.text().catch(() => '')}`.slice(0, 200));
  const data = await res.json();
  if (data && data.error) throw new Error(JSON.stringify(data.error).slice(0, 200));
  return data;
}

/* ── Instagram ──────────────────────────────────────────────────────────── */
async function instagram() {
  const token = env('IG_TOKEN');
  const id = env('IG_USER_ID');
  if (!token || !id) return null;

  const out = { followers: null, views: null, interactions: null, profileViews: null, mediaCount: null };

  try {
    const acc = await jget(
      `${GRAPH}/${id}?fields=followers_count,media_count&access_token=${encodeURIComponent(token)}`
    );
    out.followers = acc.followers_count ?? null;
    out.mediaCount = acc.media_count ?? null;
  } catch (e) {
    console.warn('instagram account:', e.message);
  }

  try {
    const metrics = ['reach', 'views', 'profile_views', 'total_interactions'];
    const url =
      `${GRAPH}/${id}/insights?metric=${metrics.join(',')}` +
      `&period=day&metric_type=total_value&access_token=${encodeURIComponent(token)}`;
    const res = await jget(url);

    const sum = (metric) =>
      (res.data || [])
        .filter((row) => row.name === metric)
        .reduce((sum, row) => sum + (row.values || []).reduce((s, v) => s + (v.value || 0), 0), 0);

    const views = sum('views');
    const reach = sum('reach');
    const interactions = sum('total_interactions');
    const profileViews = sum('profile_views');

    // `views` on Instagram counts impressions of media; reach is unique accounts.
    out.views = views || reach || null;
    out.interactions = interactions || null;
    out.profileViews = profileViews || null;
  } catch (e) {
    console.warn('instagram insights:', e.message);
  }

  return out;
}

/* ── YouTube ────────────────────────────────────────────────────────────── */
async function youtube() {
  const key = env('YT_API_KEY');
  const id = env('YT_CHANNEL_ID');
  if (!key || !id) return null;

  const res = await jget(
    `${YT}/channels?part=statistics&id=${encodeURIComponent(id)}&key=${encodeURIComponent(key)}`
  );
  const st = res?.items?.[0]?.statistics;
  if (!st) return null;

  return {
    subscribers: st.subscriberCount != null ? Number(st.subscriberCount) : null,
    views: st.viewCount != null ? Number(st.viewCount) : null,
    videos: st.videoCount != null ? Number(st.videoCount) : null,
    watchHours: null,
    monthlyAudience: null
  };
}

/* ── Write ──────────────────────────────────────────────────────────────── */
const [ig, yt] = await Promise.all([instagram().catch(() => null), youtube().catch(() => null)]);

const existing = await import('node:fs/promises')
  .then((fs) => fs.readFile(OUT, 'utf8').then(JSON.parse).catch(() => ({})))
  .catch(() => ({}));

const merged = {
  _comment:
    'Written by .github/refresh-insights.mjs. The site reads this file and patches the numbers over the static ones in config.js.',
  updated: new Date().toISOString(),
  combined: {
    views: (ig?.views ?? existing.combined?.views) ?? null,
    interactions: (ig?.interactions ?? existing.combined?.interactions) ?? null,
    profileViews: (ig?.profileViews ?? existing.combined?.profileViews) ?? null
  },
  instagram: { ...(existing.instagram || {}), ...(ig || {}) },
  youtube: { ...(existing.youtube || {}), ...(yt || {}) }
};

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(merged, null, 2) + '\n');

console.log('insights written:', JSON.stringify(merged, null, 2));
