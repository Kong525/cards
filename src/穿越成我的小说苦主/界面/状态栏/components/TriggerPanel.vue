<template>
  <div class="panel">
    <div class="panel__head">
      <span class="panel__label">已知的触发条件</span>
      <span class="panel__count">{{ known_count }} 项</span>
    </div>

    <div v-if="known_list.length === 0" class="empty">还没试出任何一条。摸头、塞钱、递卡、地上的狗盆，都得自己动手才知道。</div>

    <ul v-else class="list">
      <li v-for="row in known_list" :key="row.name + row.cond" class="list__item">
        <span class="list__name">{{ row.name }}</span>
        <span class="list__cond">{{ row.cond }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { TARGETS, useDataStore } from '../store';

const store = useDataStore();

const known_list = computed(() => {
  const rows: { name: string; cond: string }[] = [];
  for (const name of TARGETS) {
    const record = store.data[name].触发条件;
    for (const [cond, state] of Object.entries(record)) {
      if (state === '已知') {
        rows.push({ name, cond });
      }
    }
  }
  return rows;
});

const known_count = computed(() => known_list.value.length);
</script>

<style lang="scss" scoped>
.panel {
  margin-top: 10px;
  padding: 8px 10px 9px;
  background: var(--c-surface-raised);
  border: 1px dashed var(--c-border);
  border-radius: 7px;
}

.panel__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.panel__label {
  color: var(--c-text);
  font-size: 12px;
  font-weight: 600;
}

.panel__count {
  color: var(--c-primary);
  font-size: 12px;
  font-weight: 700;
}

.empty {
  margin-top: 4px;
  color: var(--c-text-muted);
  font-size: 11.5px;
}

.list {
  margin: 5px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 10px;
}

.list__item {
  display: inline-flex;
  align-items: baseline;
  gap: 5px;
  padding: 1px 7px;
  background: #f3ece0;
  border-radius: 999px;
  font-size: 11.5px;
}

.list__name {
  font-weight: 600;
}

.list__cond {
  color: var(--c-text-muted);
}
</style>
