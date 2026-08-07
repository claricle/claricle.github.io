import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import matter from 'gray-matter';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = resolve(root, 'src', 'content', 'projects');

const VALID_CATEGORIES = [
  'conformance',
  'conversion',
  'page-description',
  'parsers',
  'layout',
  'meta',
] as const;

const VALID_LANGUAGES = ['ruby', 'c', 'shell', 'html'] as const;

type Frontmatter = {
  name: string;
  title: string;
  tagline: string;
  description: string;
  category: (typeof VALID_CATEGORIES)[number];
  github: string;
  docs?: string;
  featured?: boolean;
  language?: (typeof VALID_LANGUAGES)[number];
  order?: number;
};

function loadProjects(): { slug: string; fm: Frontmatter }[] {
  const files = readdirSync(projectsDir).filter((f) => f.endsWith('.md'));
  return files.map((file) => {
    const raw = readFileSync(resolve(projectsDir, file), 'utf-8');
    const parsed = matter(raw);
    return { slug: file.replace(/\.md$/, ''), fm: parsed.data as Frontmatter };
  });
}

describe('projects collection — schema', () => {
  const projects = loadProjects();

  it('has at least 10 projects seeded', () => {
    expect(projects.length).toBeGreaterThanOrEqual(10);
  });

  for (const { slug, fm } of projects) {
    describe(`project: ${slug}`, () => {
      it('has a name matching the filename', () => {
        expect(fm.name).toBe(slug);
      });

      it('has required string fields', () => {
        expect(typeof fm.title).toBe('string');
        expect(fm.title.length).toBeGreaterThan(0);
        expect(typeof fm.tagline).toBe('string');
        expect(fm.tagline.length).toBeGreaterThan(0);
        expect(typeof fm.description).toBe('string');
        expect(fm.description.length).toBeGreaterThan(20);
      });

      it('uses a category from the spectrum set', () => {
        expect(VALID_CATEGORIES).toContain(fm.category);
      });

      it('points its github URL at the claricle org', () => {
        expect(fm.github).toMatch(
          new RegExp(`^https://github\\.com/claricle/${slug}$`)
        );
      });

      it('docs URL is optional but, if present, is a valid URL', () => {
        if (fm.docs !== undefined) {
          expect(fm.docs).toMatch(/^https?:\/\//);
        }
      });

      it('language is in the supported set', () => {
        if (fm.language !== undefined) {
          expect(VALID_LANGUAGES).toContain(fm.language);
        }
      });
    });
  }
});

describe('projects collection — invariants', () => {
  const projects = loadProjects();
  const names = projects.map((p) => p.fm.name);
  const featured = projects.filter((p) => p.fm.featured);

  it('has no duplicate names', () => {
    const seen = new Set<string>();
    for (const name of names) {
      expect(seen, `duplicate project name: ${name}`).not.toContain(name);
      seen.add(name);
    }
  });

  it('has at least 5 featured projects (home page promise)', () => {
    expect(featured.length).toBeGreaterThanOrEqual(5);
  });

  it('every featured project exists in the claricle org (URL pattern)', () => {
    for (const p of featured) {
      expect(p.fm.github).toMatch(new RegExp(`/${p.fm.name}$`));
    }
  });

  it('covers every spectrum category', () => {
    const present = new Set(projects.map((p) => p.fm.category));
    for (const cat of VALID_CATEGORIES) {
      expect(present, `missing category: ${cat}`).toContain(cat);
    }
  });
});
