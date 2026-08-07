import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

export const SpectrumCategorySchema = z.enum([
  'conformance',
  'conversion',
  'page-description',
  'parsers',
  'layout',
  'meta',
]);

export type SpectrumCategory = z.infer<typeof SpectrumCategorySchema>;

export const CATEGORY_META: Record<
  SpectrumCategory,
  { label: string; token: string; description: string }
> = {
  conformance: {
    label: 'Conformance',
    token: 'coral',
    description: 'Validate files against format standards.',
  },
  conversion: {
    label: 'Conversion',
    token: 'amber',
    description: 'Transform between vector and raster formats.',
  },
  'page-description': {
    label: 'Page description',
    token: 'forest',
    description: 'Render PostScript and PDF documents.',
  },
  parsers: {
    label: 'Parsers',
    token: 'sky',
    description: 'Read and emit binary format libraries.',
  },
  layout: {
    label: 'Layout & diagrams',
    token: 'plum',
    description: 'Arrange diagrams and graph layouts.',
  },
  meta: {
    label: 'Suite & resources',
    token: 'plum',
    description: 'The umbrella gem and reference assets.',
  },
};

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    category: SpectrumCategorySchema,
    github: z
      .string()
      .url()
      .regex(/^https:\/\/github\.com\/claricle\//,
        'github URL must point at the claricle org'),
    docs: z.string().url().optional(),
    featured: z.boolean().default(false),
    language: z.enum(['ruby', 'c', 'shell', 'html']).default('ruby'),
    order: z.number().default(100),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Claricle team'),
    tags: z.array(z.string()).default([]),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    format: z.string(),
    description: z.string(),
    url: z.string().url(),
    status: z.enum(['stable', 'beta', 'wip', 'planned']).default('stable'),
    order: z.number().default(100),
  }),
});

export const collections = { projects, blog, guides };
