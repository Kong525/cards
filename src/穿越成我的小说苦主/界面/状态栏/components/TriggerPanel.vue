<template>
  <div class="panel">
    <div class="panel__head">
      <span class="panel__label">{{ name }} 的触发条件</span>
      <span class="panel__count">已知 {{ known_list.length }} 项</span>
    </div>

    <div v-if="known_list.length === 0" class="empty">还没试出任何一条。摸头、塞钱、递卡、地上的狗盆，都得自己动手才知道。</div>

    <ul v-else class="list">
      <li v-for="cond in known_list" :key="cond" class="list__item">{{ cond }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { CharacterState } from '../store';

const props = defineProps<{
  name: string;
  state?: CharacterState;
}>();

const known_list = computed(() => Object.entries(props.state?.触发条件 ?? {}).filter(([, v]) => v === '已知').map(([k]) => k));
</script>

<style lang="scss" scoped>
.panel {
  margin-top: 9px;
  padding: 8px 10px 9px;
  background: var(--c-surface-raised);
  border: 1px dashed var(--c-border);
  border-radius: 7px;
}

.panel__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
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
  display: flex;
  flex-wrap: wrap;
  gap: 4px 8px;
  margin: 5px 0 0;
  padding: 0;
  list-style: none;
}

.list__item {
  padding: 1px 7px;
  background: #f3ece0;
  border-radius: 999px;
  font-size: 11.5px;
}
</style>
