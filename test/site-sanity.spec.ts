import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function loadManifest(): unknown {
  const path = resolve(root, '.astro', 'types.d.ts');
  try {
    readFileSync(path, 'utf-8');
    return null;
  } catch {
    return null;
  }
}

describe('site sanity', () => {
  it('exposes the canonical logo PNG at the repo root (never deleted)', () => {
    const png = resolve(root, 'logo-claricle.png');
    const buffer = readFileSync(png);
    const signature = buffer.subarray(0, 8);
    expect(Array.from(signature)).toEqual([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
  });

  it('ships an SVG variant alongside the PNG', () => {
    const svg = readFileSync(resolve(root, 'public', 'logo-claricle.svg'), 'utf-8');
    expect(svg).toContain('<svg');
    expect(svg).toContain('#e46b5b');
    expect(svg).toContain('#5889c3');
    expect(svg).toContain('#f6bb68');
    expect(svg).toContain('#ad89b5');
    expect(svg).toContain('#407f56');
  });

  it('manifest references existing icons', () => {
    const manifest = JSON.parse(
      readFileSync(resolve(root, 'public', 'site.webmanifest'), 'utf-8')
    ) as { icons: { src: string }[] };
    for (const icon of manifest.icons) {
      const path = resolve(root, 'public', icon.src.replace(/^\//, ''));
      const buffer = readFileSync(path);
      expect(buffer.length).toBeGreaterThan(0);
    }
  });

  it('astro config registers Vue and Tailwind plugins', () => {
    const config = readFileSync(resolve(root, 'astro.config.mjs'), 'utf-8');
    expect(config).toMatch(/@astrojs\/vue/);
    expect(config).toMatch(/@tailwindcss\/vite/);
  });

  it('brand.css defines the spectrum palette', () => {
    const css = readFileSync(resolve(root, 'src', 'styles', 'brand.css'), 'utf-8');
    expect(css).toContain('--color-spectrum-coral: #e56b5b');
    expect(css).toContain('--color-spectrum-amber: #f7bc68');
    expect(css).toContain('--color-spectrum-forest: #3f7f55');
    expect(css).toContain('--color-spectrum-sky: #588ac4');
    expect(css).toContain('--color-spectrum-plum: #ad89b6');
  });

  it('astro types file exists (type generation has run)', () => {
    expect(loadManifest()).toBeNull();
    const declaration = readFileSync(resolve(root, '.astro', 'types.d.ts'), 'utf-8');
    expect(declaration).toMatch(/astro\/(client|content)/);
  });
});
