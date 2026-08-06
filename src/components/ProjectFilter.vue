<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import type { Component } from 'vue';

interface ProjectLite {
  id: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  github: string;
  docs?: string;
  featured: boolean;
  language: string;
  order: number;
}

interface Props {
  categories: string[];
  initial?: string;
}
const props = withDefaults(defineProps<Props>(), { initial: 'all' });

const active = ref(props.initial);
const projects = ref<ProjectLite[]>([]);

const CATEGORY_LABELS: Record<string, string> = {
  conformance: 'Conformance',
  conversion: 'Conversion',
  'page-description': 'Page description',
  parsers: 'Parsers',
  layout: 'Layout & diagrams',
  meta: 'Suite & resources',
};

const CATEGORY_TOKENS: Record<string, string> = {
  conformance: 'coral',
  conversion: 'amber',
  'page-description': 'forest',
  parsers: 'sky',
  layout: 'plum',
  meta: 'plum',
};

const filtered = computed(() =>
  active.value === 'all'
    ? projects.value
    : projects.value.filter((p) => p.category === active.value)
);

function syncUrl() {
  const url = new URL(window.location.href);
  if (active.value === 'all') url.searchParams.delete('category');
  else url.searchParams.set('category', active.value);
  window.history.replaceState({}, '', url);
}

onMounted(() => {
  const host = document.querySelector('.projects-grid-filterable');
  if (!host) return;
  const data = host.getAttribute('data-projects');
  if (data) projects.value = JSON.parse(data);

  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('category');
  if (fromUrl && props.categories.includes(fromUrl)) active.value = fromUrl;
});

watch(active, syncUrl);
</script>

<template>
  <div class="filter-bar" role="tablist" aria-label="Filter projects by category">
    <button
      :class="['chip', { active: active === 'all' }]"
      @click="active = 'all'"
      role="tab"
      :aria-selected="active === 'all'"
    >All</button>
    <button
      v-for="cat in categories"
      :key="cat"
      :class="['chip', `chip-${CATEGORY_TOKENS[cat]}`, { active: active === cat }]"
      @click="active = cat"
      role="tab"
      :aria-selected="active === cat"
    >{{ CATEGORY_LABELS[cat] ?? cat }}</button>
    <span class="result-count">{{ filtered.length }} project{{ filtered.length === 1 ? '' : 's' }}</span>
  </div>

  <div class="filtered-grid">
    <article
      v-for="p in filtered"
      :key="p.id"
      :class="['card', `cat-${CATEGORY_TOKENS[p.category]}`]"
    >
      <div :class="['card-stripe', `stripe-${CATEGORY_TOKENS[p.category]}`]"></div>
      <div class="card-body">
        <header class="card-header">
          <h3 class="card-title">{{ p.title }}</h3>
          <span :class="['badge', `badge-${CATEGORY_TOKENS[p.category]}`]">
            {{ CATEGORY_LABELS[p.category] }}
          </span>
        </header>
        <p class="card-tagline">{{ p.tagline }}</p>
        <p class="card-desc">{{ p.description }}</p>
        <div class="card-meta">
          <span :class="['lang', `lang-${p.language}`]">{{ p.language }}</span>
        </div>
        <div class="card-links">
          <a :href="p.github" target="_blank" rel="noopener" class="link-primary">GitHub</a>
          <a v-if="p.docs" :href="p.docs" target="_blank" rel="noopener" class="link-secondary">Docs</a>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0 0;
}
.chip {
  border: 1px solid var(--color-line);
  background: var(--color-canvas);
  color: var(--color-ink-muted);
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.chip:hover { color: var(--color-ink); }
.chip.active { background: var(--color-ink); color: var(--color-canvas); border-color: var(--color-ink); }
.chip-coral.active  { background: var(--color-spectrum-coral); border-color: var(--color-spectrum-coral); }
.chip-amber.active  { background: var(--color-spectrum-amber); border-color: var(--color-spectrum-amber); color: #2a2a2a; }
.chip-forest.active { background: var(--color-spectrum-forest); border-color: var(--color-spectrum-forest); }
.chip-sky.active    { background: var(--color-spectrum-sky); border-color: var(--color-spectrum-sky); }
.chip-plum.active   { background: var(--color-spectrum-plum); border-color: var(--color-spectrum-plum); }
.result-count {
  margin-left: auto;
  font-size: 0.82rem;
  color: var(--color-ink-muted);
}

.filtered-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
  margin: 1.5rem 0 3rem;
}
.card {
  position: relative;
  background: var(--color-canvas);
  border: 1px solid var(--color-line);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.card:hover { transform: translateY(-3px); box-shadow: var(--shadow-card-hover); }
.card-stripe { height: 4px; }
.stripe-coral  { background: var(--color-spectrum-coral); }
.stripe-amber  { background: var(--color-spectrum-amber); }
.stripe-forest { background: var(--color-spectrum-forest); }
.stripe-sky    { background: var(--color-spectrum-sky); }
.stripe-plum   { background: var(--color-spectrum-plum); }

.card-body { padding: 1.25rem 1.4rem 1.4rem; display: flex; flex-direction: column; gap: 0.6rem; flex: 1; }
.card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.75rem; }
.card-title { margin: 0; font-size: 1.15rem; font-weight: 600; letter-spacing: -0.01em; }
.card-tagline { margin: 0; color: var(--color-ink); font-size: 0.95rem; font-weight: 500; }
.card-desc { margin: 0; color: var(--color-ink-muted); font-size: 0.88rem; line-height: 1.55; flex: 1; }
.card-meta { display: flex; gap: 0.5rem; margin-top: 0.25rem; }
.lang {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: var(--color-canvas-soft);
  color: var(--color-ink-muted);
  border: 1px solid var(--color-line);
}
.badge {
  font-size: 0.72rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid currentColor;
}
.badge-coral  { color: var(--color-spectrum-coral); }
.badge-amber  { color: #b8842c; }
.badge-forest { color: var(--color-spectrum-forest); }
.badge-sky    { color: var(--color-spectrum-sky); }
.badge-plum   { color: var(--color-spectrum-plum); }
.card-links { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
.link-primary, .link-secondary {
  font-size: 0.85rem;
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
}
.link-primary { background: var(--color-ink); color: var(--color-canvas); }
.link-secondary { background: var(--color-canvas-soft); color: var(--color-ink); border: 1px solid var(--color-line); }
</style>
