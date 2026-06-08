import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    brand: z.string(),
    product: z.string(),
    score: z.number().nullable().optional(),
    price: z.string().optional(),
    code: z.string().optional(),
    discount: z.string().optional(),
    merchantUrl: z.string().optional(),
    summary: z.string(),
    verdict: z.string().optional(),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    updated: z.string().optional(),
    category: z.string().default('E-bikes'),
    status: z.enum(['published', 'research-in-progress', 'coming-soon']).default('published'),
    bestFor: z.string().optional(),
    avoidIf: z.string().optional(),
    priceRange: z.string().optional(),
    specs: z.record(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).optional(),
    customerReviews: z.array(z.object({
      name: z.string(),
      rating: z.number(),
      title: z.string(),
      body: z.string(),
      avatar: z.string().optional(),
      source: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { reviews };
