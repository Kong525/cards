<template>
  <div class="panel">
    <div class="panel__head">
      <span class="panel__label">{{ name }} 的触发条件</span>
      <span class="panel__count">
        <template v-if="unwritten">手稿里没有</template>
        <template v-else>
          已验 {{ groups.done.length }}<i v-if="groups.draft.length"> · 手稿 {{ groups.draft.length }}</i>
        </template>
      </span>
    </div>

    <div v-if="groups.off.length" class="line">
      <span class="line__k line__k--off">不符</span>
      <span v-for="cond in groups.off" :key="cond" class="chip chip--off">{{ cond }}</span>
    </div>

    <div v-if="groups.done.length" class="line">
      <span class="line__k line__k--ok">已验</span>
      <span v-for="cond in groups.done" :key="cond" class="chip chip--ok">{{ cond }}</span>
    </div>

    <div v-if="groups.draft.length" class="line">
      <span class="line__k">手稿</span>
      <span v-for="cond in groups.draft" :key="cond" class="chip">{{ cond }}</span>
    </div>

    <div v-if="groups.off.length === 0 && groups.done.length === 0 && groups.draft.length === 0" class="empty">
      <template v-if="unwritten">手稿里没有这个人。条件只能自己试，试成了才会记下来。</template>
      <template v-else>还没试出任何一条。</template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { split_triggers, type CharacterState } from '../store';

const props = defineProps<{
  name: string;
  state?: CharacterState;
  unwritten: boolean;
}>();

const groups = computed(() => split_triggers(props.state?.触发条件));
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

  i {
    color: var(--c-text-muted);
    font-style: normal;
    font-weight: 500;
  }
}

.line {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 6px;
  margin-top: 5px;
}

.line__k {
  flex: 0 0 auto;
  min-width: 30px;
  color: var(--c-text-muted);
  font-size: 10.5px;
}

.line__k--off {
  color: var(--c-danger);
}

.line__k--ok {
  color: var(--c-system);
}

.chip {
  padding: 1px 7px;
  background: var(--c-surface-soft);
  border: 1px dashed var(--c-border);
  border-radius: 999px;
  color: var(--c-text-muted);
  font-size: 11.5px;
}

.chip--ok {
  border: 1px solid var(--c-system);
  background: transparent;
  color: var(--c-system);
  font-weight: 600;
}

.chip--off {
  border: 1px solid var(--c-danger);
  background: transparent;
  color: var(--c-danger);
  text-decoration: line-through;
}

.empty {
  margin-top: 4px;
  color: var(--c-text-muted);
  font-size: 11.5px;
}
</style>
