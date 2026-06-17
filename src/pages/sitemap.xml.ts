import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://picknotch.com';

// Static, indexable routes. Thin placeholders (/best, /compare) are intentionally
// excluded here AND noindexed in their pages until they hold real content.
const staticPages: { path: string; priority: string; changefreq: string }[] = [
  { path: '/',                     priority: '1.0', changefreq: 'weekly' },
  { path: '/reviews',              priority: '0.9', changefreq: 'weekly' },
  { path: '/categories',           priority: '0.6', changefreq: 'monthly' },
  { path: '/categories/e-bikes',   priority: '0.8', changefreq: 'weekly' },
  { path: '/methodology',          priority: '0.5', changefreq: 'yearly' },
  { path: '/about',                priority: '0.4', changefreq: 'yearly' },
  { path: '/affiliate-disclosure', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy',              priority: '0.3', changefreq: 'yearly' },
  { path: '/contact',              priority: '0.3', changefreq: 'yearly' },
];

export const GET: APIRoute = async () => {
  // Every published review is added automatically — no manual sitemap edits ever again.
  const reviews = await getCollection('reviews');
  const published = reviews.filter((r) => r.data.status === 'published');

  const urls = [
    ...staticPages.map((p) => ({ loc: `${SITE}${p.path}`, changefreq: p.changefreq, priority: p.priority })),
    ...published.map((r) => ({
      loc: `${SITE}/reviews/${r.slug}`,
      changefreq: 'monthly',
      // Flagship review keeps the top review priority; the rest sit just below.
      priority: r.slug === 'velotric-discover-3' ? '0.9' : '0.8',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${u.loc}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`)
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
