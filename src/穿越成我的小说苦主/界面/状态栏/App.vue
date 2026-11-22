<template>
  <div class="card">
    <TopBar />

    <button class="fold" type="button" @click="open = !open">
      <span class="fold__state">
        <span class="fold__dot" :class="{ 'is-hot': active_count > 0 }"></span>
        {{ active_count > 0 ? `${active_count} 人在显形` : '全员潜伏' }}
      </span>
      <span class="fold__top">洗脑度最高：{{ top_name }} {{ top_value }}%</span>
      <span class="fold__chev">{{ open ? '收起' : '展开' }}</span>
    </button>

    <div v-if="open" class="body">
      <TargetGrid />
      <TriggerPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBar from './components/TopBar.vue';
import TargetGrid from './components/TargetGrid.vue';
import TriggerPanel from './components/TriggerPanel.vue';
import { TARGETS, useDataStore } from './store';

const store = useDataStore();
const open = useLocalStorage('穿越成我的小说苦主:statusbar:open', true);

const active_count = computed(() => TARGETS.filter(name => store.data[name].显形态 === '显形').length);

const top = computed(() => {
  let best = TARGETS[0];
  for (const name of TARGETS) {
    if (store.data[name].洗脑度 > store.data[best].洗脑度) {
      best = name;
    }
  }
  return best;
});
const top_name = computed(() => top.value);
const top_value = computed(() => store.data[top.value].洗脑度);
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 760px;
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
