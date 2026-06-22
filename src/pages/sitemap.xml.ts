import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://picknotch.com';

// Build date, used as the lastmod for index-style pages (home, /reviews,
// category hub) that genuinely change whenever a review is added/redeployed.
const BUILD = new Date().toISOString().slice(0, 10);
// Launch month — honest lastmod for the static legal/info pages that don't move.
const LAUNCH = '2026-06';

// `updated` on a review is a human "Month YYYY" (e.g. "June 2026"); sitemap
// lastmod must be W3C/ISO. Convert to ISO year-month, falling back to build date.
const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];
const toIsoMonth = (s?: string): string | undefined => {
  if (!s) return undefined;
  const m = s.trim().toLowerCase().match(/^([a-z]+)\s+(\d{4})$/);
  if (m) {
    const idx = MONTHS.indexOf(m[1]);
    if (idx >= 0) return `${m[2]}-${String(idx + 1).padStart(2, '0')}`;
  }
  return /^\d{4}-\d{2}/.test(s) ? s.slice(0, 10) : undefined;
};

// Static, indexable routes. Thin placeholders (/best, /compare) are intentionally
// excluded here AND noindexed in their pages until they hold real content.
const staticPages: { path: string; priority: string; changefreq: string; lastmod: string }[] = [
  { path: '/',                     priority: '1.0', changefreq: 'weekly',  lastmod: BUILD },
  { path: '/reviews',              priority: '0.9', changefreq: 'weekly',  lastmod: BUILD },
  { path: '/categories',           priority: '0.6', changefreq: 'monthly', lastmod: LAUNCH },
  { path: '/categories/e-bikes',   priority: '0.8', changefreq: 'weekly',  lastmod: BUILD },
  { path: '/methodology',          priority: '0.5', changefreq: 'yearly',  lastmod: LAUNCH },
  { path: '/about',                priority: '0.4', changefreq: 'yearly',  lastmod: LAUNCH },
  { path: '/affiliate-disclosure', priority: '0.3', changefreq: 'yearly',  lastmod: LAUNCH },
  { path: '/privacy',              priority: '0.3', changefreq: 'yearly',  lastmod: LAUNCH },
  { path: '/contact',              priority: '0.3', changefreq: 'yearly',  lastmod: LAUNCH },
];

export const GET: APIRoute = async () => {
  // Every published review is added automatically — no manual sitemap edits ever again.
  const reviews = await getCollection('reviews');
  const published = reviews.filter((r) => r.data.status === 'published');

  const urls = [
    ...staticPages.map((p) => ({ loc: `${SITE}${p.path}`, changefreq: p.changefreq, priority: p.priority, lastmod: p.lastmod })),
    ...published.map((r) => ({
      loc: `${SITE}/reviews/${r.slug}`,
      changefreq: 'monthly',
      // Flagship review keeps the top review priority; the rest sit just below.
      priority: r.slug === 'velotric-discover-3' ? '0.9' : '0.8',
      lastmod: toIsoMonth(r.data.updated) ?? BUILD,
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`)
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
