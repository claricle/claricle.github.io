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
  it('ships light and dark icon variants for theme-aware display', () => {
    const light = readFileSync(
      resolve(root, 'public', 'logo-claricle_icon-light.svg'),
      'utf-8'
    );
    const dark = readFileSync(
      resolve(root, 'public', 'logo-claricle_icon-dark.svg'),
      'utf-8'
    );
    expect(light).toContain('<svg');
    expect(dark).toContain('<svg');
    expect(light).toContain('#db6b5b');
    expect(light).toContain('#7ba8e1');
    expect(dark).toContain('#ff886a');
    expect(dark).toContain('#51a2ff');
  });

  it('ships the 834x834 light PNG for Open Graph previews', () => {
    const png = readFileSync(
      resolve(root, 'public', 'logo-claricle_icon-light.png')
    );
    const signature = png.subarray(0, 8);
    expect(Array.from(signature)).toEqual([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
    // IHDR width (bytes 16-19, big-endian) should be 834
    const width = (png[16] << 24) | (png[17] << 16) | (png[18] << 8) | png[19];
    expect(width).toBe(834);
  });

  it('ships paired light + dark favicon variants for every format', () => {
    const variants = [
      'favicon-light.svg', 'favicon-dark.svg',
      'favicon-light-96x96.png', 'favicon-dark-96x96.png',
      'favicon-light.ico', 'favicon-dark.ico',
      'apple-touch-icon-light.png', 'apple-touch-icon-dark.png',
      'web-app-manifest-light-192x192.png', 'web-app-manifest-dark-192x192.png',
      'web-app-manifest-light-512x512.png', 'web-app-manifest-dark-512x512.png',
    ];
    for (const file of variants) {
      const path = resolve(root, 'public', file);
      const buffer = readFileSync(path);
      expect(buffer.length, `expected ${file} to be non-empty`).toBeGreaterThan(0);
    }
  });

  it('BaseLayout applies favicons based on resolved theme', () => {
    const layout = readFileSync(
      resolve(root, 'src', 'components', 'BaseLayout.astro'),
      'utf-8'
    );
    expect(layout).toMatch(/data-favicon=["'](?:svg|png|ico|apple)["']/);
    expect(layout).toMatch(/applyFavicons\(resolveTheme\(\)\)/);
    expect(layout).toMatch(/window\.__applyClaricleFavicons/);
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

  it('brand.css overrides the spectrum palette for dark mode', () => {
    const css = readFileSync(resolve(root, 'src', 'styles', 'brand.css'), 'utf-8');
    expect(css).toContain('[data-theme=\'dark\']');
    expect(css).toContain('--color-spectrum-coral: #ff886a');
    expect(css).toContain('--color-spectrum-sky: #51a2ff');
  });

  it('BaseLayout has a FOUC-prevention script that applies stored theme before paint', () => {
    const layout = readFileSync(
      resolve(root, 'src', 'components', 'BaseLayout.astro'),
      'utf-8'
    );
    expect(layout).toMatch(/is:inline/);
    expect(layout).toMatch(/claricle-theme/);
    expect(layout).toMatch(/setAttribute\(['"]data-theme['"]/);
  });

  it('astro types file exists (type generation has run)', () => {
    expect(loadManifest()).toBeNull();
    const declaration = readFileSync(resolve(root, '.astro', 'types.d.ts'), 'utf-8');
    expect(declaration).toMatch(/astro\/(client|content)/);
  });
});
