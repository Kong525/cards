<template>
  <div class="card" :class="{ 'is-shown': state?.显形态 === '显形', 'is-deep': (state?.洗脑度 ?? 0) >= 80 }">
    <div class="card__top">
      <div class="card__name">
        {{ name }}
        <span v-if="state?.在场" class="badge">在场</span>
      </div>
      <div class="card__seq">{{ index + 1 }} / {{ total }}<span v-if="fallback" class="card__seq-note">无人到场，列全名册</span></div>
    </div>

    <div class="card__score">
      <span class="score__value">{{ state?.洗脑度 ?? 0 }}</span>
      <span class="score__unit">%</span>
      <span class="score__stage">{{ state?.人格阶段 }}</span>
    </div>

    <div class="bar">
      <div class="bar__fill" :style="{ width: `${state?.洗脑度 ?? 0}%` }"></div>
      <span class="bar__tick bar__tick--60"><i>60</i></span>
      <span class="bar__tick bar__tick--80"><i>80</i></span>
    </div>

    <dl class="card__rows">
      <div class="row">
        <dt>当前人格</dt>
        <dd class="row__persona">{{ state?.当前人格 || '无' }}</dd>
      </div>
      <div class="row">
        <dt>称号</dt>
        <dd class="row__title">{{ state?.称号 || '无' }}</dd>
      </div>
      <div class="row">
        <dt>人格维持</dt>
        <dd>{{ state?.人格维持 || '未触发' }}</dd>
      </div>
    </dl>

    <div class="tags">
      <span class="tag" :class="{ 'tag--shown': state?.显形态 === '显形' }">{{ state?.显形态 || '潜伏' }}</span>
      <span class="tag tag--hw">功课 {{ state?.今日功课 || '已完成' }}</span>
      <span class="tag">{{ known_count }} 条条件已知</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CharacterState } from '../store';

const props = defineProps<{
  name: string;
  state?: CharacterState;
  index: number;
  total: number;
  fallback: boolean;
}>();

const known_count = computed(() => Object.values(props.state?.触发条件 ?? {}).filter(v => v === '已知').length);
</script>

<style lang="scss" scoped>
.card {
  padding: 10px 12px 11px;
  background: var(--c-surface-raised);
  border: 1px solid var(--c-border);
  border-left: 3px solid var(--c-border);
  border-radius: 7px;

  &.is-shown {
    border-left-color: var(--c-accent);
    box-shadow: 0 0 0 1px rgb(196 106 156 / 26%);
  }

  &.is-deep .score__value {
    color: var(--c-accent);
  }
}

.card__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.card__name {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.badge {
  margin-left: 6px;
  padding: 0 6px;
  border: 1px solid var(--c-system);
  border-radius: 999px;
  color: var(--c-system);
  font-size: 10px;
  font-weight: 600;
  vertical-align: 2px;
}

.card__seq {
  color: var(--c-text-muted);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}

.card__seq-note {
  margin-left: 6px;
  color: var(--c-border);
}

.card__score {
  display: flex;
  align-items: baseline;
  gap: 3px;
  margin-top: 2px;
}

.score__value {
  font-size: 26px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
}

.score__unit {
  color: var(--c-text-muted);
  font-size: 12px;
}

.score__stage {
  margin-left: 8px;
  padding: 0 7px;
  border: 1px solid var(--c-primary);
  border-radius: 999px;
  color: var(--c-primary);
  font-size: 11px;
}

.bar {
  position: relative;
  height: 8px;
  margin: 6px 0 8px;
  background: var(--c-track);
  border-radius: 4px;
}

.bar__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--c-primary), var(--c-accent));
  border-radius: 4px;
  transition: width 0.5s ease;
}

.bar__tick {
  position: absolute;
  top: -2px;
  width: 1px;
  height: 12px;
  background: rgb(233 229 245 / 26%);

  i {
    position: absolute;
    top: 12px;
    left: 2px;
    color: var(--c-text-muted);
    font-size: 9px;
    font-style: normal;
  }

  &--60 {
    left: 60%;
  }

  &--80 {
    left: 80%;
  }
}

.card__rows {
  display: grid;
  gap: 2px;
  margin: 6px 0 0;
}

.row {
  display: flex;
  gap: 8px;
  align-items: baseline;
  font-size: 12.5px;

  dt {
    flex: 0 0 60px;
    color: var(--c-text-muted);
    font-size: 11.5px;
  }

  dd {
    margin: 0;
    min-width: 0;
  }
}

.row__persona {
  color: var(--c-primary);
  font-weight: 700;
}

.row__title {
  color: var(--c-text);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
}

.tag {
  padding: 0 7px;
  border: 1px solid var(--c-border);
  border-radius: 999px;
  color: var(--c-text-muted);
  font-size: 10.5px;
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
