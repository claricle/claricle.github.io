import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import matter from 'gray-matter';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = resolve(root, 'src', 'content', 'projects');

const VALID_ROLES = ['model', 'lens', 'projection', 'engine', 'suite'] as const;

/** Every role must earn its place on the projects page with at least one entry. */
const CORE_ROLES = ['model', 'lens', 'projection', 'engine'] as const;

type Frontmatter = {
  name: string;
  role: (typeof VALID_ROLES)[number];
  rubygems?: string;
};

function loadProjects(): { slug: string; fm: Frontmatter }[] {
  const files = readdirSync(projectsDir).filter((f) => f.endsWith('.md'));
  return files.map((file) => {
    const raw = readFileSync(resolve(projectsDir, file), 'utf-8');
    const parsed = matter(raw);
    return { slug: file.replace(/\.md$/, ''), fm: parsed.data as Frontmatter };
  });
}

describe('projects collection — roles', () => {
  const projects = loadProjects();

  it('gives every project a role from the role set', () => {
    for (const { slug, fm } of projects) {
      expect(VALID_ROLES, `${slug} has no valid role`).toContain(fm.role);
    }
  });

  it('covers every core role with at least one project', () => {
    const present = new Set(projects.map((p) => p.fm.role));
    for (const role of CORE_ROLES) {
      expect(present, `no project carries the role: ${role}`).toContain(role);
    }
  });

  it('has more than one project per role (groups are not stubs)', () => {
    for (const role of CORE_ROLES) {
      const count = projects.filter((p) => p.fm.role === role).length;
      expect(count, `role ${role} has only ${count} project`).toBeGreaterThan(1);
    }
  });
});

describe('projects collection — rubygems links', () => {
  const projects = loadProjects();

  it('formats every rubygems URL as a rubygems.org/gems/<name> page', () => {
    for (const { slug, fm } of projects) {
      if (fm.rubygems === undefined) continue;
      expect(
        fm.rubygems,
        `${slug} rubygems URL must be https://rubygems.org/gems/<name>`
      ).toMatch(/^https:\/\/rubygems\.org\/gems\/[A-Za-z0-9_.-]+$/);
    }
  });

  it('keeps rubygems slugs distinct from repo names when they differ', () => {
    // libpng-ruby publishes as `libpng`; emf2svg-ruby as `emf2svg`. Guard the
    // non-obvious mappings against regression to the repo name.
    const bySlug = new Map(projects.map((p) => [p.slug, p.fm]));
    expect(bySlug.get('libpng-ruby')?.rubygems).toBe(
      'https://rubygems.org/gems/libpng'
    );
    expect(bySlug.get('emf2svg-ruby')?.rubygems).toBe(
      'https://rubygems.org/gems/emf2svg'
    );
  });
});
