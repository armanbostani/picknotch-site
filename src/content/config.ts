import { defineCollection, z } from 'astro:content';
const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    brand: z.string(),
    product: z.string(),
    score: z.number(),
    price: z.string(),
    code: z.string().optional(),
    discount: z.string().optional(),
    merchantUrl: z.string(),
    summary: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    updated: z.string(),
    category: z.string().default('E-bikes'),
  }),
});
export const collections = { reviews };
