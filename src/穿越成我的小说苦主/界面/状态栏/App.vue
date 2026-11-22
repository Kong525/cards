<template>
  <div class="card">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterPager from './components/CharacterPager.vue';
import TopBar from './components/TopBar.vue';
import { get_character, list_characters, useDataStore } from './store';

const store = useDataStore();
const open = useLocalStorage('穿越成我的小说苦主:statusbar:open', true);

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
    background: #f3ece0;
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
    box-shadow: 0 0 0 3px rgb(180 72 92 / 18%);
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
</style>
