# Portfolio site — Vishaish Kumar Kashyap

A hand-built, dependency-free portfolio site for a sports journalist, fitness creator,
anchor and emcee.

**Stack:** plain HTML + CSS + vanilla JS. No framework, no build step, no npm.
Upload the folder and it works.

---

## 📐 The page, top to bottom

| # | Section | What it does |
|---|---|---|
| 01 | **About** | One statement, your two paragraphs, and the 4 things you do for a client as priority cards, right under the fold |
| 02 | **Existing work** | Only your best performing pieces, sorted by reach, filterable by platform. The full back catalogue lives behind the brand tiles |
| 03 | **Brands** | Two counter-scrolling rows of brand logos. Tap one to open that brand's work |
| 04 | **Audience insights** | Views, interactions, profile visits, followers. Then a per-channel breakdown |
| 05 | **More than a creator** | The leagues and tournaments, and the four services with links to real anchoring and emcee work |
| 06 | **Why work with me** | Two reasons: athlete first, cover it then scale it. The banner itself is the link, no extra button |
| 07 | **Formats I deliver** | The chips, nothing more |
| 08 | **What brands say** | Testimonials |
| 09 | **Let's work together** | Your email, your three socials, and a one-click brief |

Every section answers one question a brand actually asks. Nothing repeats.

> **Hover the big headline in section 05** and the full list of tournaments you have
> covered slides open underneath it, then retracts when you move away. On a phone
> there is no hover, so the list stays open instead.

---

## 📁 What's in the box

```
index.html                 the page
assets/
  css/styles.css           all styling + design tokens (colours/fonts live at the top)
  js/config.js             ⭐ THE ONLY FILE YOU NEED TO EDIT
  js/main.js               all the animation + logic
  img/
    hero/hero-anchor.jpg   the hero shot (Times Now, Premier Padel)
    hero/football-1..3.jpg the three football frames that float around it
    brands/                the 13 real brand logos
    work/                  real thumbnails pulled from your posts
    favicon.svg            the lime "VK" tab icon, identical to the nav mark
    favicon.png            180x180 PNG fallback for the tab
    favicon.ico            multi-size icon (16/32/48/64/128/180)
    apple-touch-icon.png   180x180 square icon for iOS home screen
```

---

## ⭐ 1. Fill in your details

Open **`assets/js/config.js`**. Everything is in one object with comments.

| What you want to change | Where in `config.js` |
|---|---|
| Your name, initials | `name` |
| Your job title | `role` |
| Your one-line pitch | `tagline` |
| City + timezone | `location`, `timeZone` |
| Instagram / YouTube / LinkedIn | `socials` |
| Email | `email` |
| The dashboard numbers | `insights` |
| The brands + their logos | `brands` |
| Your videos / reels / posts | `work` |
| The 4 priority cards | `about.priority` |
| "Why work with me" points | `why` |
| The formats chips | `formats` |
| Leagues, tournaments, services | `anchor` |
| Quotes from brands | `testimonials` |

### Your photo
The hero uses `assets/img/hero/hero-anchor.jpg` (cropped to 4:5, focused on you).
Swap that file, or point the `<img src>` in `index.html` at a new one. If it's missing,
the site falls back to a "VK" monogram so it never breaks.

The three football shots in `assets/img/hero/football-1..3.jpg` are the frames that float
around the hero portrait. Any portrait-orientation photo works.

---

## ⭐ 2. The brand rows

Section **03** is two horizontal rows of logos scrolling in opposite directions.
Hovering a row pauses it. Tapping a logo opens a lightbox with that brand's work.

```js
{
  name: "Nivia Sports",
  key: "nivia",                    // matches brandKey on its work items
  category: "Sportswear",
  logo: "nivia.png",               // file in assets/img/brands/
  blend: "invert",                 // only if the source logo is black
  pending: false,                  // true → "Coming soon" badge, links straight to the brand
  note: "Ash turf football campaign: reels, training content…",
  url: "https://www.instagram.com/niviasports/"
}
```

| `blend` | Use when | Effect |
|---|---|---|
| *(omit)* | the logo is already light or coloured | shown as-is |
| `"invert"` | the logo file is black | flipped to white |
| `"screen"` | the logo is white on a black rectangle | the black drops out |

Every logo in `assets/img/brands/` has already been trimmed to its tight bounding box,
so they all sit centred and consistent in the tile. Drop in a new file and use the same
filename (`.png`) and it will slot straight in.

**Important:** the key is always `blend`, never `invert`. Use `blend: "invert"` for a black
logo, `blend: "screen"` for a white logo on a black rectangle, and omit it for everything
else. A logo left black without `blend: "invert"` will be invisible on the dark tiles.

**Brands with no work yet open their Instagram directly.** Brands with work open the
lightbox with the real posts embedded.

---

## ⭐ 3. The work

Only items flagged `featured: true` appear in the Selected Work grid, sorted by `reach`
(highest first). Everything else stays in the catalogue and is reachable from the brand
lightbox. That keeps the grid short and makes the pieces that actually performed the
hero.

```js
{
  platform: "instagram",           // "youtube" | "instagram"
  category: "brand",               // brand | sports | fitness | lifestyle |
                                   // reporting | hosting | events
  brand: "Nivia Sports",
  brandKey: "nivia",               // links it to the brand tile
  title: "Ash turf football campaign: testing the new Aura turf shoes on real grass",
  metric: "4.3K",
  metricLabel: "likes",
  thumb: "assets/img/work/nivia-reel-1.jpg",
  featured: true,                  // ← shows in the grid
  reach: 4300,                     // ← used to sort the grid
  pin: true,                       // ← forces it to the top (optional)
  embed: "https://www.instagram.com/reel/DbqLymgzCEz/embed/",
  url:   "https://www.instagram.com/reel/DbqLymgzCEz/"
}
```

To hide a piece from the grid, remove `featured: true`. To show one, add it.
To promote a piece, raise its `reach` number. To pin one to the very top of the
grid regardless of reach, add `pin: true` (the Nivia Ash turf campaign uses this).

Five pieces (Greenex, Casence, Frido, Sova and the fitness post) are **not** featured on
purpose, because each one already appears inside its own brand tile in section 03. They
stay in the catalogue, so removing the `featured` flag later puts them back.

### Where to get each URL

**YouTube**
- embed: `https://www.youtube.com/embed/VIDEO_ID`
- thumb: `https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg`
- link:  `https://youtube.com/watch?v=VIDEO_ID`

**Instagram** (post or reel)
- embed: `https://www.instagram.com/p/SHORTCODE/embed/` (or `/reel/SHORTCODE/embed/`)
- link:  `https://www.instagram.com/p/SHORTCODE/`

**Thumbnails** are already downloaded in `assets/img/work/`. To add a new one, drop the
file in that folder and point `thumb` at it. Instagram only serves 360×640 for reels,
which is why they look crisp on the cards but soft if blown up huge.

> Instagram embeds only work on **public** posts. If a post is private, keep the embed
> but make sure the direct link still works.

---

## ⭐ 4. The Anchor section

Section **05** lists your leagues and tournaments, then the four things you can do for a
client. The tournament list is a **hover reveal**: the big headline is the trigger,
hovering it slides the list open with an orange rule down the left, and moving away
retracts it. Each service card carries a thumbnail and a link to a real piece of anchoring
or emcee work, so a brand can check your on-ground record in one tap.

```js
services: [
  {
    icon: "mic", title: "On-ground reporting",
    body: "Match reports, live updates and athlete interviews, filed the same night.",
    thumb: "assets/img/work/journalism-4.jpg",
    badge: "IPBL",
    link: "https://www.instagram.com/p/DVGRVv3j683/",
    linkLabel: "Watch the interview"
  }
]
```

Swap the four `link` values for the strongest, best-lit clips from each event.

---

## ⭐ 5. How brands reach you

There is no form and no WhatsApp button. The contact section has two routes, both of them
straight into your inbox:

1. **Your email address**, on its own, as a link.
2. **"Write the brief"**, which opens the visitor's mail app with a pre-filled template
   asking for brand, deliverables, budget range and timeline.

The template is built in `assets/js/main.js` (search for `briefBody`). Edit the lines
there to change what gets pre-filled. Nothing is sent anywhere except the visitor's own
email client, so there is no backend, no spam folder and nothing to maintain.

---

## 🔴 Live numbers (auto-updating insights)

The Audience Insights panel can update itself. Right now it shows the numbers you gave me.
Two ways to make it live, pick one.

### Option A — YouTube only (5 minutes, no server)

The YouTube Data API returns public channel stats and a **public API key is safe in the
browser**, so this needs no backend at all.

1. [Google Cloud Console](https://console.cloud.google.com) → create a project.
2. Enable **YouTube Data API v3**.
3. Credentials → Create credentials → API key. (Restrict it to your site for safety.)
4. Find your channel id: open `youtube.com/@vishaishkashyap` and copy the `UC....` from the
   channel URL.
5. In `assets/js/config.js`:

```js
live: {
  ytChannelId: "UCxxxxxxxxxxxxxxxxxxxxxx",
  ytApiKey:    "AIzaSy...",
  insightsUrl: "",          // leave blank, this is the YouTube-only path
  cacheMinutes: 60
}
```

Subscriber count, total views and video count go live instantly. The rest of the panel
keeps your static numbers until you do option B.

> The key is public-safe for public data, but anyone can use it, so **restrict it to your
> domain** in the Google console. Quota is 10,000 units/day and this call costs 1, so it
> will never run out. The site caches the result in `localStorage` for an hour so
> returning visitors do not consume your quota.

### Option B — Instagram + YouTube (the recommended setup)

Instagram's API needs a **Meta access token**, and that token must never live in browser
code. So the fix is to have something trustworthy fetch the numbers and write them to
`data/insights.json`, which your site then reads. That file is included, the script is
included, and a GitHub Action is already wired up to run every 4 hours.

**Step 1 — switch your Instagram to a Professional account**
Settings → Account → Switch to Professional → **Creator** or **Business**.

**Step 2 — link a Facebook Page**
In the IG app: Settings → Account → Sharing to other apps → Facebook → create or link
a Page.

**Step 3 — create the Meta app**
[developers.facebook.com](https://developers.facebook.com) → Create app → type "Other" →
add the **Instagram** product → set up OAuth with these scopes:
`instagram_basic`, `instagram_manage_insights`.

**Step 4 — get your IDs and a long-lived token**

```bash
# Your Instagram user id (numeric) and a long-lived token:
curl -s "https://graph.facebook.com/v21.0/me/accounts?fields=id,name,access_token&access_token=SHORT_LIVED_TOKEN"
```

Swap the short-lived token for a long-lived one (60 days) so the job keeps working:

```bash
curl -s "https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN"
```

**Step 5 — add the secrets**
In your GitHub repo → Settings → Secrets and variables → Actions → New repository secret:

| Secret | Value |
|---|---|
| `YT_API_KEY` | your YouTube API key |
| `YT_CHANNEL_ID` | your `UC...` channel id |
| `IG_USER_ID` | your numeric Instagram user id |
| `IG_TOKEN` | the long-lived Graph API token |

**Step 6 — push the repo and let the Action run**
The workflow at `.github/workflows/insights.yml` fires every 4 hours and commits
`data/insights.json`. The site reads it on load, shows a green **Live · updated 4h ago**
badge, and falls back to the static numbers if the file is missing or empty.

Run it once manually from the **Actions → Refresh insights → Run workflow** tab to see it
work immediately.

### What each platform can actually give you

| Metric | Instagram | YouTube | Needs |
|---|---|---|---|
| Followers / subscribers | ✅ | ✅ | Graph API + Data API |
| Views, reach | ✅ | ✅ | Graph API insights + Data API |
| Interactions, profile visits | ✅ | ❌ | Graph API insights |
| Age, gender, top cities | ✅ | ⚠️ | Graph API + YouTube Analytics (OAuth) |
| Watch time, monthly audience | ❌ | ⚠️ | YouTube Analytics only |
| Top videos by views | ✅ | ✅ | Graph API media insights |

Two honest caveats:

- **Instagram insights need `instagram_manage_insights`**, which requires Meta App Review
  for anything beyond your own account. For your own account in dev mode it works without
  review, but dev-mode tokens are short-lived, so the long-lived token route above is the
  one to use.
- **YouTube's age, gender and city breakdowns need YouTube Analytics**, not the Data API.
  That needs OAuth as the channel owner (`yt-analytics.readonly`) and a refresh token, and
  the data lags **48 to 72 hours**. It also silently returns empty rows when your sample
  size is under Google's privacy threshold, which at 871 subscribers can happen. The
  numbers you already have from the Studio screenshots are the safest source for those.

### If you would rather not touch any API

Delete `data/insights.json` and leave `live` blank. The panel keeps showing the static
numbers and nothing breaks. The live layer is entirely optional.

## 🎨 Changing the look

All the design tokens sit at the very top of `assets/css/styles.css`:

```css
:root{
  --ink:   #08090a;   /* page background */
  --paper: #f2efe8;   /* light text */
  --volt:  #d8ff3e;   /* accent colour  ← change this */
  --orange:#ff6a2b;   /* third accent: labels, icons, micro-details */
  --flare: var(--orange);
  --violet:#6b4dff;   /* tertiary glow */
  --ff-display: 'Anton', ...;   /* headlines */
  --ff-body:    'Inter', ...;    /* body copy */
  --ff-mono:    'JetBrains Mono';/* labels */
}
```

The palette is three hues: **volt** for the primary calls to action and the big numbers,
**violet** for the glow, and **orange** for the small stuff, section numbers, card icons,
brand labels and the anchor hover panel. Change `--volt` and the whole site recolours.

---

## 🖼️ The link-preview image

`assets/img/og.jpg` (1200×630) is the image WhatsApp, LinkedIn, X and Instagram show when
someone shares your site link. It is generated from the hero anchoring shot: name in Anton,
role eyebrow, availability line and the VK monogram.

**The `og:image` URL in `index.html` must be absolute** or the crawlers will not find it:

```html
<meta property="og:image" content="https://YOUR-DOMAIN/assets/img/og.jpg" />
```

Right now it points at the GitHub Pages URL. **If you add a custom domain later, update
this line to your own domain**, otherwise your WhatsApp previews will keep using the
long `github.io` link.

To regenerate the image after changing your name or tagline, the easiest route is to
re-run the canvas script that built it, or just drop a new 1200×630 JPEG in at
`assets/img/og.jpg` with the same filename.

---

## ☁️ Deploying to Cloudflare

The repo is set up for **Cloudflare Workers with static assets**. Everything you need is
already here:

```
wrangler.jsonc        the config, including the observability block Cloudflare asked for
src/worker.js         serves the site + the /api/insights endpoint
.assetsignore         keeps repo files and server code out of the asset upload
```

**One-time setup**

1. Install Node.js (v20 or newer) from [nodejs.org](https://nodejs.org)
2. In this folder:

```bash
npm install -g wrangler        # or use npx instead of the global install
wrangler login                  # opens a browser, approve the Worker
```

3. Deploy:

```bash
wrangler deploy
```

The site goes live on `https://vishaish-kashyap-portfolio.<your-subdomain>.workers.dev`.
Add a custom domain in the Cloudflare dashboard under **Workers & Pages → your worker →
Settings → Domains & Routes**.

**Adding your API secrets** (this is what makes the Instagram numbers live)

```bash
wrangler secret put IG_TOKEN        # long-lived Meta Graph API token
wrangler secret put IG_USER_ID      # numeric Instagram user id
wrangler secret put YT_API_KEY      # public YouTube Data API key
wrangler secret put YT_CHANNEL_ID   # your "UC..." channel id
```

They are stored encrypted by Cloudflare and never appear in the page source. The site's
live layer calls `/api/insights` on the same origin, so there is no CORS problem and no
token in the browser. See "Live numbers" above for how to get each value.

**If you deploy to Cloudflare Pages instead of Workers**, use this in `wrangler.jsonc`:

```jsonc
{
  "name": "vishaish-kashyap-portfolio",
  "pages_build_output_dir": "./",
  "observability": { "logs": { "enabled": true }, "traces": { "enabled": false } }
}
```

Pages has no Worker runtime, so `/api/insights` will not exist there. Use the GitHub
Action route in "Live numbers" instead, and the site falls back to `data/insights.json`
automatically.

---

## 🚀 Publishing it

**Fastest (2 minutes) — Netlify Drop**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole project folder in.
3. Done, you get a live URL immediately.

**Netlify / Vercel from GitHub**
1. Push the folder to a GitHub repo.
2. Import it at Netlify or Vercel. Build command: *(leave empty)*. Publish directory: `.`
3. Add your custom domain in the domain settings.

**Hostinger / cPanel / any shared host**
1. Upload the contents of the folder to `public_html`.
2. Done, it runs on Apache with no configuration.

**GitHub Pages**
1. Settings → Pages → deploy from branch → `main` / root.

After you have a domain, add a `sitemap.xml` listing your one page, and replace
`assets/img/og.jpg` with a 1200×630 image so link previews (WhatsApp, LinkedIn, iMessage)
show your photo when you share the link.

---

## ✨ The animation list

Everything is vanilla JS in `assets/js/main.js`, driven by `IntersectionObserver` and
`requestAnimationFrame` so it stays at 60fps.

- Preloader with a live counter and a letter-by-letter name
- Split-text hero reveal, line by line, out of a mask
- **Floating football frames** around the hero portrait, each on its own drift and parallax depth
- **Two counter-scrolling brand rows**, paused on hover
- Brand lightbox with a live embed, thumbnail strip and prev/next
- Custom cursor with a difference blend mode, plus "Preview" and "Open" states
- Magnetic buttons that pull toward the cursor
- Film grain and vignette overlay
- Scroll-linked word-by-word highlighting in the About statement
- **Hover-reveal tournament list** in the Anchor section, with an orange rule and a spring
- Auto-playing testimonial slider (swipe and drag)
- Sticky "Work with me" pill that appears after the hero
- Nav that hides on scroll down and returns on scroll up
- Full-screen mobile menu with a circular clip-path reveal
- 3D tilt on the hero portrait

**Accessibility:** full `prefers-reduced-motion` support, keyboard-focusable controls,
Escape closes the modals and the menu, ARIA labels throughout, and 4.5:1+ colour contrast
on every label. Lighthouse scores 100 across accessibility, best practices and SEO.

---

## 📱 Before you send the link

- [ ] `config.js` → `insights` numbers refreshed from a fresh dashboard screenshot
- [ ] `config.js` → the four `anchor.services` links swapped for your best clips
- [ ] `config.js` → `work` → `featured` flags tuned to show only your strongest pieces
- [ ] `config.js` → `work` → `pin: true` on the piece you want first in the grid
- [ ] `config.js` → SIX5SIX links added, then remove `pending: true`
- [ ] `assets/js/main.js` → `briefBody` template edited to ask for what you actually need
- [ ] `assets/media-kit.pdf` added, if you want a downloadable kit
- [ ] `assets/img/og.jpg` is your link-preview image (1200x630, already generated)
- [ ] The browser tab shows the lime "VK" chip (the same mark as the nav). It is
      `assets/img/favicon.svg`, with `favicon.ico` (16 to 180px), `favicon.png`
      and `apple-touch-icon.png` as the fallbacks. Bump the `?v=` on those four
      `<link>` tags in `index.html` whenever you change the icon, or browsers
      will keep serving the old one from their cache.
- [ ] Open the site on your phone and check the mobile menu
