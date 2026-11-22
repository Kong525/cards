<template>
  <div class="cell" :class="{ 'is-shown': data.显形态 === '显形', 'is-deep': data.洗脑度 >= 80 }">
    <div class="cell__head">
      <span class="cell__name">{{ name }}</span>
      <span class="cell__value">{{ data.洗脑度 }}<span class="cell__unit">%</span></span>
    </div>

    <div class="bar">
      <div class="bar__fill" :style="{ width: `${data.洗脑度}%` }"></div>
      <span class="bar__tick bar__tick--60"></span>
      <span class="bar__tick bar__tick--80"></span>
    </div>

    <div class="cell__persona">{{ data.当前人格 }}</div>
    <div class="cell__title">{{ data.称号 }}</div>

    <div class="cell__foot">
      <span class="tag" :class="{ 'tag--shown': data.显形态 === '显形' }">{{ data.显形态 }}</span>
      <span class="tag tag--hw">功课 {{ data.今日功课 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore, type TargetName } from '../store';

const props = defineProps<{ name: TargetName }>();
const store = useDataStore();
const data = computed(() => store.data[props.name]);
</script>

<style lang="scss" scoped>
.cell {
  padding: 7px 9px 8px;
  background: var(--c-surface-raised);
  border: 1px solid var(--c-border);
  border-left: 3px solid var(--c-border);
  border-radius: 7px;

  &.is-shown {
    border-left-color: var(--c-accent);
    box-shadow: 0 0 0 1px rgb(180 72 92 / 22%);
  }

  &.is-deep .cell__value {
    color: var(--c-accent);
  }
}

.cell__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.cell__name {
  font-weight: 700;
  letter-spacing: 0.02em;
}

.cell__value {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.cell__unit {
  margin-left: 1px;
  color: var(--c-text-muted);
  font-size: 10px;
  font-weight: 400;
}

.bar {
  position: relative;
  height: 6px;
  margin: 4px 0 5px;
  background: #ece5d8;
  border-radius: 3px;
  overflow: hidden;
}

.bar__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--c-primary), var(--c-accent));
  border-radius: 3px;
  transition: width 0.5s ease;
}

.bar__tick {
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  background: rgb(47 43 38 / 22%);

  &--60 {
    left: 60%;
  }

  &--80 {
    left: 80%;
  }
}

.cell__persona {
  font-size: 12px;
  font-weight: 600;
  color: var(--c-primary);
}

.cell__title {
  margin-top: 1px;
  color: var(--c-text-muted);
  font-size: 11px;
  min-height: 15px;
}

.cell__foot {
  display: flex;
  gap: 5px;
  margin-top: 5px;
}

.tag {
  padding: 0 6px;
  border: 1px solid var(--c-border);
  border-radius: 999px;
  color: var(--c-text-muted);
  font-size: 10px;
}

.tag--shown {
  border-color: var(--c-accent);
  color: var(--c-accent);
  font-weight: 600;
}

.tag--hw {
  border-style: dashed;
}
</style>
