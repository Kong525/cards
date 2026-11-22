<template>
  <div class="bar">
    <div class="bar__line">
      <span class="item"><span class="k">日期</span>{{ world.日期 }}</span>
      <span class="item"><span class="k">时段</span>{{ world.时间段 }}</span>
      <span class="item"><span class="k">所在</span>{{ world.当前区域 }}</span>
      <span class="item"><span class="k">场景</span>{{ world.当前场景 }}</span>
    </div>
    <div class="bar__line bar__line--second">
      <span class="stage">{{ world.剧情阶段 }}</span>
      <span class="item"><span class="k">状态</span>{{ hero.身体状态 }}</span>
      <span class="item item--muted"><span class="k">系统</span>{{ system.持有者 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const world = computed(() => store.data.世界);
const hero = computed(() => store.data.主角);
const system = computed(() => store.data.系统);
</script>

<style lang="scss" scoped>
.bar {
  padding: 8px 12px 9px;
  background: var(--c-surface-raised);
}

.bar__line {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  align-items: baseline;
}

.bar__line--second {
  margin-top: 4px;
}

.item {
  font-weight: 600;
}

.item--muted {
  color: var(--c-text-muted);
  font-weight: 500;
}

.k {
  margin-right: 5px;
  color: var(--c-text-muted);
  font-weight: 400;
  font-size: 12px;
}

.stage {
  padding: 1px 8px;
  border: 1px solid var(--c-primary);
  border-radius: 999px;
  color: var(--c-primary);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
}
</style>
