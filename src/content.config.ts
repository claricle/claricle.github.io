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

/**
 * The role a project plays in the format pipeline. Roles map onto the
 * Claricle thesis: models make formats programmable, lenses validate them,
 * projections transform them, engines carry the shared machinery.
 */
export const ProjectRoleSchema = z.enum([
  'model',
  'lens',
  'projection',
  'engine',
  'suite',
]);

export type ProjectRole = z.infer<typeof ProjectRoleSchema>;

export const ROLE_META: Record<
  ProjectRole,
  { label: string; token: string; description: string }
> = {
  model: {
    label: 'Models',
    token: 'sky',
    description:
      'Typed domain models that make a format programmable — parse it, walk it, serialize it back.',
  },
  lens: {
    label: 'Lenses',
    token: 'coral',
    description:
      'Conformance and validation views over a format — check files against the standards they claim.',
  },
  projection: {
    label: 'Projections',
    token: 'amber',
    description:
      'Transform one representation into another — every supported format fully translatable.',
  },
  engine: {
    label: 'Engines',
    token: 'forest',
    description:
      'Shared machinery underneath the suite — layout, codecs, and native cores.',
  },
  suite: {
    label: 'Suite',
    token: 'plum',
    description: 'The umbrella gem and suite-level resources.',
  },
};

export const ROLE_ORDER: ProjectRole[] = [
  'model',
  'lens',
  'projection',
  'engine',
  'suite',
];

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
    role: ProjectRoleSchema,
    github: z
      .string()
      .url()
      .regex(/^https:\/\/github\.com\/claricle\//,
        'github URL must point at the claricle org'),
    rubygems: z
      .string()
      .url()
      .regex(/^https:\/\/rubygems\.org\/gems\//,
        'rubygems URL must point at rubygems.org/gems/')
      .optional(),
    docs: z.string().url().optional(),
    featured: z.boolean().default(false),
    language: z.enum(['ruby', 'c', 'shell', 'html', 'grammar']).default('ruby'),
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
