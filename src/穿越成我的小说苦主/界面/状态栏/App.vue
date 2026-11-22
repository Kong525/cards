<template>
  <div class="card" :style="vars">
    <TopBar />

    <button class="fold" type="button" @click="open = !open">
      <span class="fold__state">
        <span class="fold__dot" :class="{ 'is-hot': active_count > 0 }"></span>
        {{ present_count > 0 ? `${present_count} 人在场` : '场上没人' }}
      </span>
      <span class="fold__top">{{ active_count > 0 ? `显形 ${active_count} 人` : '全员潜伏' }}</span>
      <span class="fold__chev">{{ open ? '收起' : '展开' }}</span>
    </button>

    <div v-if="open" class="body">
      <CharacterPager />
      <SystemPanel />
    </div>

    <div class="palette">
      <span class="palette__label">配色</span>
      <button
        v-for="name in theme_names"
        :key="name"
        type="button"
        class="palette__dot"
        :class="{ 'palette__dot--on': theme === name }"
        :style="{ background: THEMES[name].primary }"
        :title="name"
        @click="theme = name"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterPager from './components/CharacterPager.vue';
import SystemPanel from './components/SystemPanel.vue';
import TopBar from './components/TopBar.vue';
import { get_character, list_characters, THEMES, theme_vars, useDataStore, type ThemeName } from './store';

const store = useDataStore();
const open = useLocalStorage('穿越成我的小说苦主:statusbar:open', true);
const theme = useLocalStorage<ThemeName>('穿越成我的小说苦主:statusbar:theme', '夜紫');
const theme_names = Object.keys(THEMES) as ThemeName[];
const vars = computed(() => theme_vars(theme.value));

const present_count = computed(() =>
  list_characters(store.data).filter(name => get_character(store.data, name)?.在场).length,
);

const active_count = computed(() =>
  list_characters(store.data).filter(name => get_character(store.data, name)?.显形态 === '显形').length,
);
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  color: var(--c-text);
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.5;
  overflow: hidden;
}

.fold {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 7px 12px;
  background: var(--c-surface-raised);
  border: none;
  border-top: 1px dashed var(--c-border);
  color: var(--c-text);
  font: inherit;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: var(--c-surface-soft);
  }
}

.fold__state {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
}

.fold__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c-text-muted);

  &.is-hot {
    background: var(--c-accent);
    box-shadow: 0 0 0 3px rgb(196 106 156 / 22%);
  }
}

.fold__top {
  flex: 1;
  color: var(--c-text-muted);
  font-size: 12px;
}

.fold__chev {
  color: var(--c-primary);
  font-size: 12px;
}

.body {
  padding: 10px 12px 12px;
  border-top: 1px solid var(--c-border);
}

.palette {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  padding: 5px 12px 7px;
  border-top: 1px solid var(--c-border);
  background: var(--c-surface);
}

.palette__label {
  margin-right: 2px;
  color: var(--c-text-muted);
  font-size: 10.5px;
}

.palette__dot {
  width: 12px;
  height: 12px;
  padding: 0;
  border: 1px solid var(--c-border);
  border-radius: 50%;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &--on {
    transform: scale(1.2);
    box-shadow: 0 0 0 2px var(--c-text-muted);
  }
}
</style>
