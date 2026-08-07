import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function run(cmd: string, args: string[], opts: { cwd: string }) {
  try {
    const stdout = execFileSync(cmd, args, {
      cwd: opts.cwd,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 180_000,
    });
    return { ok: true as const, stdout, stderr: '' };
  } catch (err) {
    const e = err as { stdout?: string; stderr?: string; message: string };
    return {
      ok: false as const,
      stdout: e.stdout ?? '',
      stderr: e.stderr ?? e.message,
    };
  }
}

describe('astro build', () => {
  const result = run('npm', ['run', 'build'], { cwd: root });

  it('exits successfully', () => {
    if (!result.ok) {
      console.error('--- stdout ---\n' + result.stdout);
      console.error('--- stderr ---\n' + result.stderr);
    }
    expect(result.ok).toBe(true);
  });

  it('emits dist/index.html', () => {
    expect(existsSync(resolve(root, 'dist', 'index.html'))).toBe(true);
  });

  it('emits the projects page', () => {
    expect(existsSync(resolve(root, 'dist', 'projects', 'index.html'))).toBe(true);
  });

  it('emits the about page', () => {
    expect(existsSync(resolve(root, 'dist', 'about', 'index.html'))).toBe(true);
  });

  it('emits the blog index', () => {
    expect(existsSync(resolve(root, 'dist', 'blog', 'index.html'))).toBe(true);
  });

  it('copies the OG logo PNG to dist', () => {
    expect(
      existsSync(resolve(root, 'dist', 'logo-claricle_icon-light.png'))
    ).toBe(true);
  });

  afterAll(() => {
    // Free up the dist folder between test runs in watch mode if needed.
  });
});
