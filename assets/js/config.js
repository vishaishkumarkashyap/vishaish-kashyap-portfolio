/* ==========================================================================
   SITE CONFIG  ·  ⚠️  THIS IS THE ONLY FILE YOU NEED TO EDIT  ⚠️
   --------------------------------------------------------------------------
   Everything on the website is driven from this file.
   Save it, upload it, done. No build tools, no dependencies.

   QUICK MAP
   ----------
   1.  name / role / location      → the hero + nav + footer
   2.  socials                     → every social button on the site
   3.  email                        → the contact section
   4.  stats / insights            → the audience insights dashboard
   5.  brands                      → the two scrolling logo rows
   6.  work                        → the featured work grid
   7.  why                         → "Why work with me"
   8.  formats                     → "Formats I deliver"
   9.  anchor                      → "More than a creator"
   10. testimonials                → quotes from brands
   11. contact                      → the brief template lives in main.js
   ========================================================================== */

window.SITE = {
  /* ---------------------------------------------------------------- 1. YOU */
  name: {
    first: "VISHAISH",
    last: "KASHYAP",
    full: "Vishaish Kumar Kashyap",
    initials: "VK"
  },

  role: "Sports Journalist · Fitness Creator · Anchor",

  tagline:
    "Athlete turned sports presenter. I play the game, cover the game and train like " +
    "the athletes I write about, then turn all of it into content people actually stop for.",

  location: "New Delhi, India",
  availability: "Open for collaborations",
  timeZone: "Asia/Kolkata",

  /* --------------------------------------------------------------- HERO */
  ticker: [
    "Sports Journalism",
    "Fitness & Training",
    "Brand Campaigns",
    "Event Anchoring",
    "Reels & Long-form",
    "Athlete Lifestyle",
    "Available for Collaborations"
  ],

  /* -------------------------------------------------------------- ABOUT */
  about: {
    statement:
      "Five years of hosting and covering more than 15 sports leagues, " +
      "on the ground and on the mic.",
    p1:
      "A footballer turned Sports Journalist, with on-the-ground experience covering multiple " +
      "live sports events across more than 9 sports. From live event coverage to matchday " +
      "interviews, handling social media and marketing to sports operations, I have done it all.",
    p2:
      "Today I make branded content across sport, fitness and lifestyle for brands that want " +
      "an audience that actually cares. Every piece starts with me doing the thing for real: " +
      "training in the kit, using the product for a full block, then telling the truth on camera.",
    /* The four priority cards sit right under the statement. */
    priority: [
      { icon: "mic",    title: "Sports reporting",  body: "Match reports, live updates and athlete interviews." },
      { icon: "layers", title: "Anchor & emcee",    body: "Tournament desks, press days, launches and fan activations." },
      { icon: "target", title: "Fitness content",   body: "Training, recovery, nutrition and honest progression." },
      { icon: "chart",  title: "Brand campaigns",   body: "UGC, reels, YouTube films and always-on social." }
    ]
  },

  /* ---------------------------------------------------------- 2. SOCIALS */
  socials: [
    {
      key: "instagram",
      label: "Instagram",
      handle: "@vishaishkashyap",
      url: "https://www.instagram.com/vishaishkashyap/"
    },
    {
      key: "youtube",
      label: "YouTube",
      handle: "@vishaishkashyap",
      url: "https://www.youtube.com/@vishaishkashyap"
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      handle: "in/vishaish-kumar-kashyap",
      url: "https://www.linkedin.com/in/vishaish-kumar-kashyap-190a70197/"
    }
  ],

  /* --------------------------------------------------------- 3. CONTACT */
  email: "vishaishkashyap.collab@gmail.com",

  /* ----------------------------------------------------- 3b. LIVE NUMBERS ─── */
  /* Optional. Fill in ONE of these to make the insights panel auto-update.
     If everything is blank the static numbers below are used, so nothing breaks.

     A. Easiest (5 min): YouTube only.
        - Google Cloud Console > enable "YouTube Data API v3"
        - Create an API key
        - Paste your channel id (the "UC...." from your channel URL) below
        The public key is safe in the browser for public channel data.

     B. Best (1 hr + Meta setup): a scheduled job that writes a JSON file.
        - See README "Live numbers" for the full walkthrough
        - A GitHub Action or Apps Script fetches both APIs and writes
          data/insights.json. The site reads it on load.

     C. Instagram live counts need a server-side token (Meta Graph API).
        Put the token in a Netlify/Vercel function, never in this file. */
  live: {
    ytChannelId: "",        // "UCxxxxxxxxxxxxxxxxxxxxxx"
    ytApiKey: "",           // public YouTube Data API key
    insightsUrl: "data/insights.json",  // optional JSON written by a cron job
    cacheMinutes: 60,       // client-side cache so you do not burn API quota

    // Set this to "/api/insights" ONLY when you deploy on Cloudflare, where
    // the Worker holds the Instagram token server-side. Leave it blank on
    // GitHub Pages so the site does not fire a request that would 404.
    apiPath: ""
  },

  /* --------------------------------------------------- 4. AUDIENCE INSIGHTS */
  /* Real numbers straight from the Instagram + YouTube dashboards. */
  insights: {
    headline: "9.9M views in 30 days",
    intro:
      "Instagram and YouTube combined. Real numbers from the last 30 days, no rounding up.",
    range: "Sep 15 to Oct 20, 2026",
    stats: [
      { value: 9.9,   suffix: "M", label: "Views",          note: "across both channels", live: "views" },
      { value: 312,   suffix: "K", label: "Interactions",   note: "likes, comments, shares", live: "interactions" },
      { value: 178,   suffix: "K", label: "Profile visits", note: "last 30 days", live: "profileViews" },
      { value: 2553,  suffix: "",  label: "Followers",      note: "+17.4% in 30 days", live: "followers" }
    ],
    channels: [
      {
        platform: "Instagram",
        handle: "@vishaishkashyap",
        icon: "i-ig",
        stats: [
          { value: "2,553", label: "Followers",      live: "igFollowers" },
          { value: "9.9M",  label: "Views",          live: "igViews" },
          { value: "312K",  label: "Interactions",   live: "igInteractions" },
          { value: "178K",  label: "Profile visits", live: "igProfileViews" }
        ]
      },
      {
        platform: "YouTube",
        handle: "@vishaishkashyap",
        icon: "i-yt",
        stats: [
          { value: "871",   label: "Subscribers",      live: "subscribers" },
          { value: "99.6K", label: "Views",           live: "ytViews" },
          { value: "651h",  label: "Watch time",      live: "watchHours" },
          { value: "31.1K", label: "Monthly audience", live: "monthlyAudience" }
        ]
      }
    ],
    groups: [
    ]
  },

  /* ------------------------------------------------------------ 5. BRANDS */
  /* logo:  file in assets/img/brands/
     invert: true → the source file is black, so flip it to white on the dark UI
     note:  one line on what you made for them                              */
  brands: [
    { name: "Nivia Sports",     key: "nivia",       category: "Sportswear",  logo: "nivia.png",        note: "Ash turf football campaign: reels, training content and a football-first lifestyle shoot.", url: "https://www.instagram.com/niviasports/" },
    { name: "SIX5SIX Sport",   key: "six5six",     category: "Apparel",     logo: "six5six.png",  blend: "invert", pending: true, note: "Multi-format sportswear campaign, dropping shortly.", url: "https://www.instagram.com/six5sixsport/" },
    { name: "ACE Blend",        key: "aceblend",    category: "Nutrition",   logo: "aceblend.png",     note: "YouTube brand film and product-led content for a clinical nutrition brand.", url: "https://www.instagram.com/ace.blend/" },
    { name: "Frido",            key: "frido",       category: "Health tech", logo: "frido.png",        note: "Product-first reel built around the actual use case, not a spec sheet.", url: "https://www.instagram.com/myfrido/" },
    { name: "Greenex",          key: "greenex",     category: "Nutrition",   logo: "greenex.png",      note: "GXN sports performance supplements, from founder stories to giveaway campaigns.", url: "https://www.instagram.com/greenex_nutrition/" },
    { name: "Dabur",            key: "dabur",       category: "Wellness",    logo: "dabur.png",        note: "UGC reel for a daily wellness product line, shot and edited to platform spec.", url: "https://www.instagram.com/daburindialtd/" },
    { name: "Casence",          key: "casence",     category: "Magnetic holder", logo: "casence.png",   note: "Magnetic phone holder reel: the gear you take on the pitch and the reason it stays put.", url: "https://www.instagram.com/shopcasence/" },
    { name: "DT Zone",          key: "dtzone",      category: "Gaming",      logo: "dtzone.png",       note: "PlayStation exclusives: FC26 and PS5 Slim launches, plus store activation content.", url: "https://www.instagram.com/dtzone_official/" },
    { name: "SOva Health",      key: "sova",        category: "Gut health",  logo: "sova.png",         note: "Gut health education content that still sold like a product ad.", url: "https://www.instagram.com/sova_health/" },
    { name: "Snapdragon",       key: "snapdragon",  category: "Technology",  logo: "snapdragon.png",   note: "Shot on Snapdragon sports content: football, motion and real camera performance.", url: "https://www.instagram.com/snapdragon_in/" },
    { name: "Sheher Bagh",      key: "sheherbagh",  category: "Hospitality", logo: "sheherbagh.png",  note: "Offbeat stay content for a hidden oasis just outside the city.", url: "https://www.instagram.com/sheher_bagh/" },
    { name: "Wholefoods India", key: "wholefoods",  category: "Grocery",     logo: "wholefoods.png",   note: "Football family content for a brand that understands how fans actually shop.", url: "https://www.instagram.com/wholefoodsindia/" },
    { name: "Wildstone",        key: "wildstone",   category: "Lifestyle",   logo: "wildstone.png", blend: "screen", note: "Moksha festival coverage, emceed on the ground and behind the camera.", url: "https://www.instagram.com/wildstoneofficial/" }
  ],

  /* -------------------------------------------------------------- 6. WORK */
  /* Only the pieces with `featured: true` appear in the Selected Work grid.
     The full back catalogue lives behind each brand tile in the lightbox.
     reach: used to sort the grid, best first.                                */
  work: [
    { platform: "instagram", category: "sports", brand: "My channel", brandKey: "",
      title: "Did you know about this before? Here's why it matters",
      metric: "19K", metricLabel: "likes",
      thumb: "assets/img/work/sports-post-1.jpg", featured: true, reach: 19000,
      embed: "https://www.instagram.com/p/DZxdAl3SQRX/embed/",
      url: "https://www.instagram.com/p/DZxdAl3SQRX/" },

    { platform: "instagram", category: "brand", brand: "Greenex", brandKey: "greenex",
      title: "The comeback giveaway: a campaign built around the comeback",
      metric: "9.4K", metricLabel: "reach",
      thumb: "assets/img/work/greenex-post-3.jpg", featured: true, reach: 9400,
      embed: "https://www.instagram.com/p/DOh-kg-Eu17/embed/",
      url: "https://www.instagram.com/p/DOh-kg-Eu17/" },

    { platform: "instagram", category: "brand", brand: "DT Zone", brandKey: "dtzone",
      title: "The new PS5 Slim: launch content and store activation",
      metric: "8.2K", metricLabel: "reach",
      thumb: "assets/img/work/dtzone-reel-1.jpg", duration: "0:40", featured: true, reach: 8200,
      embed: "https://www.instagram.com/reel/DQZVh7iE89_/embed/",
      url: "https://www.instagram.com/reel/DQZVh7iE89_/" },

    { platform: "instagram", category: "brand", brand: "Dabur", brandKey: "dabur",
      title: "Everyday wellness starts with everyday choices: UGC reel",
      metric: "6.1K", metricLabel: "reach",
      thumb: "assets/img/work/dabur-reel-1.jpg", duration: "0:29", featured: true, reach: 6100,
      embed: "https://www.instagram.com/reel/DT7NSPfkgKs/embed/",
      url: "https://www.instagram.com/reel/DT7NSPfkgKs/" },

    { platform: "instagram", category: "brand", brand: "DT Zone", brandKey: "dtzone",
      title: "FC26 has officially launched, now live at DTzone outlets",
      metric: "5.3K", metricLabel: "reach",
      thumb: "assets/img/work/dtzone-post-1.jpg", featured: true, reach: 5300,
      embed: "https://www.instagram.com/p/DYUgcAnTI0V/embed/",
      url: "https://www.instagram.com/p/DYUgcAnTI0V/" },

    { platform: "instagram", category: "brand", brand: "Nivia Sports", brandKey: "nivia",
      title: "Football meets streetwear: the Ash range on the pitch",
      metric: "4.9K", metricLabel: "likes",
      thumb: "assets/img/work/nivia-reel-3.jpg", duration: "0:38", featured: true, reach: 4900,
      embed: "https://www.instagram.com/reel/DdERCeBBJlo/embed/",
      url: "https://www.instagram.com/reel/DdERCeBBJlo/" },

    { platform: "instagram", category: "brand", brand: "Wholefoods India", brandKey: "wholefoods",
      title: "We asked our football-loving family how this one's gonna turn out",
      metric: "4.7K", metricLabel: "reach",
      thumb: "assets/img/work/wholefoods-post-1.jpg", featured: true, reach: 4700,
      embed: "https://www.instagram.com/p/DbDOC9LPdgI/embed/",
      url: "https://www.instagram.com/p/DbDOC9LPdgI/" },

    { platform: "instagram", category: "brand", brand: "Nivia Sports", brandKey: "nivia",
      title: "Ash turf football campaign: testing the new Aura turf shoes on real grass",
      metric: "4.3K", metricLabel: "likes",
      thumb: "assets/img/work/nivia-reel-1.jpg", duration: "0:42", featured: true, reach: 4300, pin: true,
      embed: "https://www.instagram.com/reel/DbqLymgzCEz/embed/",
      url: "https://www.instagram.com/reel/DbqLymgzCEz/" },

    { platform: "youtube", category: "brand", brand: "ACE Blend", brandKey: "aceblend",
      title: "I took a clinical nutrition brand's stack for 30 days. Here's the honest result.",
      metric: "Brand film", metricLabel: "YouTube",
      thumb: "https://i.ytimg.com/vi/MPXEKeZOVv4/hqdefault.jpg", featured: true, reach: 4100,
      embed: "https://www.youtube.com/embed/MPXEKeZOVv4",
      url: "https://www.youtube.com/watch?v=MPXEKeZOVv4" },

    { platform: "instagram", category: "brand", brand: "Greenex", brandKey: "greenex",
      title: "Behind every story I cover there's an athlete I train to be",
      metric: "2.3K", metricLabel: "reach",
      thumb: "assets/img/work/greenex-post-2.jpg",
      embed: "https://www.instagram.com/p/DRjVMdrkvRP/embed/",
      url: "https://www.instagram.com/p/DRjVMdrkvRP/" },

    { platform: "instagram", category: "fitness", brand: "My channel", brandKey: "",
      title: "Most people train for the mirror. Athletes train for the season.",
      metric: "106", metricLabel: "likes",
      thumb: "assets/img/work/fitness-post-1.jpg",
      embed: "https://www.instagram.com/p/DZM8LZRyJUK/embed/",
      url: "https://www.instagram.com/p/DZM8LZRyJUK/" },

    { platform: "instagram", category: "brand", brand: "Sheher Bagh", brandKey: "sheherbagh",
      title: "Welcome to Sheher Bagh 23: a hidden oasis 15 minutes from the city",
      metric: "726", metricLabel: "likes",
      thumb: "assets/img/work/sheherbagh-post-1.jpg", featured: true, reach: 726,
      embed: "https://www.instagram.com/p/DK2IeavTds4/embed/",
      url: "https://www.instagram.com/p/DK2IeavTds4/" },

    { platform: "instagram", category: "brand", brand: "Snapdragon", brandKey: "snapdragon",
      title: "Setting the scene: Shot on Snapdragon football content",
      metric: "240", metricLabel: "likes",
      thumb: "assets/img/work/snapdragon-post-1.jpg", featured: true, reach: 240,
      embed: "https://www.instagram.com/p/DJl3-RxOY4y/embed/",
      url: "https://www.instagram.com/p/DJl3-RxOY4y/" },

    { platform: "instagram", category: "brand", brand: "Casence", brandKey: "casence",
      title: "Magnetic phone holder, tested where it matters: on the pitch",
      metric: "162", metricLabel: "likes",
      thumb: "assets/img/work/casence-reel-1.jpg", duration: "0:34",
      embed: "https://www.instagram.com/reel/DcqhFYZB-Tv/embed/",
      url: "https://www.instagram.com/reel/DcqhFYZB-Tv/" },

    { platform: "instagram", category: "brand", brand: "Frido", brandKey: "frido",
      title: "The problem Frido actually solves, told as a reel and not a spec sheet",
      metric: "146", metricLabel: "likes",
      thumb: "assets/img/work/frido-reel-1.jpg", duration: "0:36",
      embed: "https://www.instagram.com/reel/DeqotM_ygvI/embed/",
      url: "https://www.instagram.com/reel/DeqotM_ygvI/" },

    { platform: "instagram", category: "brand", brand: "SOva Health", brandKey: "sova",
      title: "Low on energy? Your gut might be the issue",
      metric: "74", metricLabel: "likes",
      thumb: "assets/img/work/sova-post-1.jpg",
      embed: "https://www.instagram.com/p/DHvxHn8MVtR/embed/",
      url: "https://www.instagram.com/p/DHvxHn8MVtR/" },

    /* ── Full back catalogue. Not shown in the grid, but reachable from the brand tiles. ── */
    { platform: "instagram", category: "brand", brand: "Nivia Sports", brandKey: "nivia",
      title: "ASMR training session with the new Ash football",
      metric: "2.1K", metricLabel: "likes",
      thumb: "assets/img/work/nivia-reel-2.jpg", duration: "0:31",
      embed: "https://www.instagram.com/reel/Dbu4hdfSSqH/embed/",
      url: "https://www.instagram.com/reel/Dbu4hdfSSqH/" },
    { platform: "instagram", category: "brand", brand: "Nivia Sports", brandKey: "nivia",
      title: "Aura turf football shoes put through a full testing session",
      metric: "3.4K", metricLabel: "likes",
      thumb: "assets/img/work/nivia-reel-4.jpg", duration: "0:44",
      embed: "https://www.instagram.com/reel/DaxuTaAonys/embed/",
      url: "https://www.instagram.com/reel/DaxuTaAonys/" },
    { platform: "instagram", category: "brand", brand: "Greenex", brandKey: "greenex",
      title: "Performance supplements, explained by someone who trains on them",
      metric: "104", metricLabel: "likes",
      thumb: "assets/img/work/greenex-post-1.jpg",
      embed: "https://www.instagram.com/p/DTsFIq8kjXR/embed/",
      url: "https://www.instagram.com/p/DTsFIq8kjXR/" },
    { platform: "instagram", category: "brand", brand: "DT Zone", brandKey: "dtzone",
      title: "Real sim racing starts here: FC26 on PlayStation",
      metric: "5.3K", metricLabel: "reach",
      thumb: "assets/img/work/dtzone-post-1.jpg",
      embed: "https://www.instagram.com/p/DYUgcAnTI0V/embed/",
      url: "https://www.instagram.com/p/DYUgcAnTI0V/" },
    { platform: "instagram", category: "brand", brand: "DT Zone", brandKey: "dtzone",
      title: "Summer sale: PS5 Slim content for the festive push",
      metric: "3.8K", metricLabel: "reach",
      thumb: "assets/img/work/dtzone-post-2.jpg",
      embed: "https://www.instagram.com/p/DIiJLUHP_ZY/embed/",
      url: "https://www.instagram.com/p/DIiJLUHP_ZY/" },
    { platform: "instagram", category: "brand", brand: "DT Zone", brandKey: "dtzone",
      title: "PS5 FC26 has officially launched at DTzone outlets",
      metric: "4.1K", metricLabel: "reach",
      thumb: "assets/img/work/dtzone-post-3.jpg",
      embed: "https://www.instagram.com/p/DPEfgEUk850/embed/",
      url: "https://www.instagram.com/p/DPEfgEUk850/" },

    /* ── Sports, fitness and lifestyle ── */
    { platform: "instagram", category: "sports", brand: "My channel", brandKey: "",
      title: "From 'he's leaving Bayern' to 'wait, none of this is real'",
      metric: "Breakdown", metricLabel: "transfer saga",
      thumb: "assets/img/work/sports-reel-1.jpg", duration: "1:12",
      embed: "https://www.instagram.com/reel/Dau16BKyYye/embed/",
      url: "https://www.instagram.com/reel/Dau16BKyYye/" },
    { platform: "instagram", category: "sports", brand: "My channel", brandKey: "",
      title: "Some players chase new boots. Enzo chased history in the same pair.",
      metric: "Sport & gear", metricLabel: "story piece",
      thumb: "assets/img/work/sports-reel-2.jpg", duration: "0:47",
      embed: "https://www.instagram.com/reel/Da5qFAmJ5_G/embed/",
      url: "https://www.instagram.com/reel/Da5qFAmJ5_G/" },
    { platform: "instagram", category: "fitness", brand: "My channel", brandKey: "",
      title: "Life is peaceful with a football at my feet: Ashtang 3.0 test",
      metric: "151", metricLabel: "likes",
      thumb: "assets/img/work/fitness-post-2.jpg",
      embed: "https://www.instagram.com/p/DYY7Qf8TkWw/embed/",
      url: "https://www.instagram.com/p/DYY7Qf8TkWw/" },
    { platform: "instagram", category: "fitness", brand: "My channel", brandKey: "",
      title: "Injuries don't just test your body. They test your system.",
      metric: "151", metricLabel: "likes",
      thumb: "assets/img/work/fitness-post-3.jpg",
      embed: "https://www.instagram.com/p/DVQn66zAZkt/embed/",
      url: "https://www.instagram.com/p/DVQn66zAZkt/" },
    { platform: "instagram", category: "fitness", brand: "My channel", brandKey: "",
      title: "Simple yet effective: athletic warm-up sequence",
      metric: "112", metricLabel: "likes",
      thumb: "assets/img/work/fitness-reel-1.jpg", duration: "0:28",
      embed: "https://www.instagram.com/reel/DddXr22T3JP/embed/",
      url: "https://www.instagram.com/reel/DddXr22T3JP/" },
    { platform: "instagram", category: "fitness", brand: "My channel", brandKey: "",
      title: "Heel-elevated isometric holds for ankle stiffness and force transfer",
      metric: "Explainer", metricLabel: "training",
      thumb: "assets/img/work/fitness-reel-2.jpg", duration: "0:51",
      embed: "https://www.instagram.com/reel/DZH8CrmzRQ0/embed/",
      url: "https://www.instagram.com/reel/DZH8CrmzRQ0/" },
    { platform: "instagram", category: "lifestyle", brand: "My channel", brandKey: "",
      title: "What is this behaviour: a football fan reacts to a supermarket",
      metric: "205", metricLabel: "likes",
      thumb: "assets/img/work/lifestyle-reel-1.jpg", duration: "0:41",
      embed: "https://www.instagram.com/reel/DfRb49GSA_e/embed/",
      url: "https://www.instagram.com/reel/DfRb49GSA_e/" },
    { platform: "instagram", category: "lifestyle", brand: "My channel", brandKey: "",
      title: "Everything we did at the PL Park, New Delhi",
      metric: "PL Park", metricLabel: "day out",
      thumb: "assets/img/work/lifestyle-reel-2.jpg", duration: "0:55",
      embed: "https://www.instagram.com/reel/De6v6TZSYoC/embed/",
      url: "https://www.instagram.com/reel/De6v6TZSYoC/" },
    { platform: "instagram", category: "lifestyle", brand: "My channel", brandKey: "",
      title: "Is it just me or you've faced similar problems with Off Duty's products?",
      metric: "3.9K", metricLabel: "reach",
      thumb: "assets/img/work/lifestyle-reel-3.jpg", duration: "0:38",
      embed: "https://www.instagram.com/reel/DUbUqeYkn9z/embed/",
      url: "https://www.instagram.com/reel/DUbUqeYkn9z/" },

    /* ── On-ground reporting, hosting and emcee ── */
    { platform: "instagram", category: "reporting", brand: "Indian Pickleball League", brandKey: "",
      title: "Ammol hails his doubles partner Stavya after the Grand Final win",
      metric: "IPBL", metricLabel: "interview",
      thumb: "assets/img/work/journalism-4.jpg",
      embed: "https://www.instagram.com/p/DVGRVv3j683/embed/",
      url: "https://www.instagram.com/p/DVGRVv3j683/" },
    { platform: "instagram", category: "reporting", brand: "Indian Pickleball League", brandKey: "",
      title: "Harshvardhan Rane on the floor of the Indian Pickleball League",
      metric: "IPBL", metricLabel: "on-ground",
      thumb: "assets/img/work/journalism-5.jpg",
      embed: "https://www.instagram.com/p/DR-JHddElzu/embed/",
      url: "https://www.instagram.com/p/DR-JHddElzu/" },
    { platform: "instagram", category: "reporting", brand: "Pickleball Now", brandKey: "",
      title: "It's 3/3 for Chennai Super Warriors on Day 3 of the Indian Pickleball League",
      metric: "IPBL", metricLabel: "desk",
      thumb: "assets/img/work/journalism-8.jpg",
      embed: "https://www.instagram.com/p/DRzX5LTCSYI/embed/",
      url: "https://www.instagram.com/p/DRzX5LTCSYI/" },
    { platform: "instagram", category: "reporting", brand: "Pickleball Now", brandKey: "",
      title: "GPF President Javier Regalado on the IPBL 2025 and where the league goes next",
      metric: "IPBL", metricLabel: "interview",
      thumb: "assets/img/work/journalism-6.jpg",
      embed: "https://www.instagram.com/p/DR9hjLziU3x/embed/",
      url: "https://www.instagram.com/p/DR9hjLziU3x/" },
    { platform: "instagram", category: "reporting", brand: "Korfball Premier League", brandKey: "",
      title: "Two Dangal voices, one semifinal story: Iconic Performer of the Match",
      metric: "KPL", metricLabel: "on-ground",
      thumb: "assets/img/work/journalism-2.jpg",
      embed: "https://www.instagram.com/p/DeDOI56t1-y/embed/",
      url: "https://www.instagram.com/p/DeDOI56t1-y/" },
    { platform: "instagram", category: "reporting", brand: "Korfball Premier League", brandKey: "",
      title: "This one belongs to Telugu Legends: Iconic Performer of Match 15",
      metric: "KPL", metricLabel: "on-ground",
      thumb: "assets/img/work/journalism-3.jpg",
      embed: "https://www.instagram.com/p/DdwdpjxNTNg/embed/",
      url: "https://www.instagram.com/p/DdwdpjxNTNg/" },
    { platform: "instagram", category: "reporting", brand: "Sports Now", brandKey: "",
      title: "The Captain Fantastic: Megan leads her team to yet another win",
      metric: "Sports Now", metricLabel: "hosting",
      thumb: "assets/img/work/journalism-7.jpg",
      embed: "https://www.instagram.com/p/DR2Lje_ktYk/embed/",
      url: "https://www.instagram.com/p/DR2Lje_ktYk/" },
    { platform: "instagram", category: "reporting", brand: "My channel", brandKey: "",
      title: "Wanted to know more about the performance against Uruguay, but time was short",
      metric: "On-ground", metricLabel: "reporting",
      thumb: "assets/img/work/journalism-1.jpg",
      embed: "https://www.instagram.com/p/De_-IigSZnW/embed/",
      url: "https://www.instagram.com/p/De_-IigSZnW/" },
    { platform: "instagram", category: "events", brand: "Times Padel", brandKey: "",
      title: "Pullela Gopichand shares his thoughts on the padel season",
      metric: "Times Padel", metricLabel: "interview",
      thumb: "assets/img/work/padel-1.jpg",
      embed: "https://www.instagram.com/p/DPyhCSlkq8X/embed/",
      url: "https://www.instagram.com/p/DPyhCSlkq8X/" },
    { platform: "instagram", category: "events", brand: "Times Padel", brandKey: "",
      title: "Champions with heart, grit and an unbreakable bond",
      metric: "Times Padel", metricLabel: "finals",
      thumb: "assets/img/work/padel-2.jpg",
      embed: "https://www.instagram.com/p/DPvvZuFksef/embed/",
      url: "https://www.instagram.com/p/DPvvZuFksef/" },
    { platform: "instagram", category: "events", brand: "Times Padel", brandKey: "",
      title: "A gracious end to a great campaign",
      metric: "Times Padel", metricLabel: "finals",
      thumb: "assets/img/work/padel-3.jpg",
      embed: "https://www.instagram.com/p/DPvswSMkrBN/embed/",
      url: "https://www.instagram.com/p/DPvswSMkrBN/" },
    { platform: "instagram", category: "events", brand: "Times Padel", brandKey: "",
      title: "Laura and Letizia are all set for the finals",
      metric: "Times Padel", metricLabel: "finals",
      thumb: "assets/img/work/padel-4.jpg",
      embed: "https://www.instagram.com/p/DPtQevpEuRI/embed/",
      url: "https://www.instagram.com/p/DPtQevpEuRI/" },
    { platform: "instagram", category: "hosting", brand: "My channel", brandKey: "",
      title: "Nothing much to watch, just perfect DAPs with the squad",
      metric: "211", metricLabel: "likes",
      thumb: "assets/img/work/emcee-reel-1.jpg", duration: "0:33",
      embed: "https://www.instagram.com/reel/DQkG-zHEn3h/embed/",
      url: "https://www.instagram.com/reel/DQkG-zHEn3h/" }
  ],

  /* --------------------------------------------------------------- 7. WHY */
  why: [
    {
      icon: "bolt",
      title: "Athlete first",
      body: "I play the sport, I understand an athlete and the sport from both sides of the camera, which brings out the best from both worlds."
    },
    {
      icon: "target",
      title: "Cover it, then scale it",
      body: "I have the experience to not only cover and host an event, but to help it scale to the right audience using the power of storytelling through social media."
    },
  ],

  /* ----------------------------------------------------------- 8. FORMATS */
  formats: {
    headline: "Formats I deliver",
    intro: "Whatever the brief needs, this is what I can put on the record for you.",
    list: [
      "Instagram Reels", "YouTube long-form", "YouTube Shorts", "Instagram Stories",
      "Brand UGC", "On-ground reporting", "Event anchoring & emcee", "Written sports features"
    ]
  },

  /* ------------------------------------------------------- 9. ANCHOR / EMCEE */
  anchor: {
    heading: "More than a creator",
    sub: "I am also the voice of multiple sports on the ground.",
    headline: "15+ leagues & tournaments covered",
    sports: ["Padel", "Football", "Pickleball", "Korfball", "MotoGP", "Athletics", "Tennis", "Badminton", "Boxing"],
    tournaments: [
      "FIP Silver India Open 2025",
      "Indian Pickleball League 2025",
      "IPA Nationals 2025",
      "Pickleball Now Grand Prix: Delhi, Gurugram, Mumbai and Bengaluru",
      "Women's World Boxing Championships 2023",
      "Yonex Sunrise India Open 2023 and 2024",
      "Korfball Premier League",
      "MotoGP Bharat"
    ],
    services: [
      {
        icon: "mic", title: "On-ground reporting",
        body: "Match reports, live updates and athlete interviews, filed the same night.",
        thumb: "assets/img/work/journalism-4.jpg", badge: "IPBL",
        link: "https://www.instagram.com/p/DVGRVv3j683/",
        linkLabel: "Watch the interview"
      },
      {
        icon: "layers", title: "Tournament hosting",
        body: "Anchor desk, post-match analysis and player-of-the-match segments.",
        thumb: "assets/img/work/journalism-7.jpg", badge: "Desk",
        link: "https://www.instagram.com/p/DR2Lje_ktYk/",
        linkLabel: "Watch the segment"
      },
      {
        icon: "target", title: "Event emcee",
        body: "Brand activations, press days, launches and fan activations.",
        thumb: "assets/img/work/emcee-reel-1.jpg", badge: "Emcee",
        link: "https://www.instagram.com/reel/DQkG-zHEn3h/",
        linkLabel: "Watch the reel"
      },
      {
        icon: "chart", title: "Athlete interviews",
        body: "Legend-to-pro access, because I am on the ground and they know me.",
        thumb: "assets/img/work/padel-1.jpg", badge: "Padel",
        link: "https://www.instagram.com/p/DPyhCSlkq8X/",
        linkLabel: "Watch the interview"
      }
    ]
  },

  /* ------------------------------------------------------ 10. TESTIMONIALS */
  testimonials: [
    {
      quote:
        "Vishaish pitched better than most agencies we've paid. The reel wasn't a product drop, " +
        "it had a story, and our sales team started quoting the video on calls.",
      name: "Priya Nair",
      role: "Head of Brand",
      company: "Sportswear Brand"
    },
    {
      quote:
        "One brief, three platforms, zero drama on the shoot day. He showed up early, understood " +
        "the compliance angle without us spelling it out, and delivered a week early.",
      name: "Rohit Menon",
      role: "Marketing Lead",
      company: "Nutrition Brand"
    },
    {
      quote:
        "We needed someone who could talk about performance without sounding like an ad. He " +
        "handled the athletes like a journalist and it converted 3x better than our last push.",
      name: "Ananya Iyer",
      role: "Brand Manager",
      company: "Sports Equipment Brand"
    }
  ],

  /* ---------------------------------------------------------------------- */
  footerNote: "Available for brand collaborations, event anchoring, on-ground reporting and long-term creator partnerships.",
  copyright: "© 2026 Vishaish Kumar Kashyap. All rights reserved."
};
