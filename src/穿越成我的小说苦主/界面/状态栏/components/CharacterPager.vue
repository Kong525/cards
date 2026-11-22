<template>
  <div class="page">
    <button class="nav" type="button" :disabled="list.length <= 1" @click="prev">‹</button>

    <div class="slot">
      <CharacterCard v-if="current" :name="current" :state="current_state" :index="index" :total="list.length" :fallback="is_fallback" />
      <div v-else class="empty">
        <div class="empty__title">场上没有需要盯的人</div>
        <div class="empty__hint">等有人进门、有人被叫住，这里才会亮起来。</div>
      </div>
    </div>

    <button class="nav" type="button" :disabled="list.length <= 1" @click="next">›</button>
  </div>

  <div v-if="list.length > 1" class="dots">
    <button v-for="(name, i) in list" :key="name" type="button" class="dot" :class="{ 'dot--on': i === index }" :title="name" @click="index = i"></button>
  </div>

  <TriggerPanel v-if="current" :name="current" :state="current_state" />
</template>

<script setup lang="ts">
import CharacterCard from './CharacterCard.vue';
import TriggerPanel from './TriggerPanel.vue';
import { get_character, list_characters, useDataStore } from '../store';

const store = useDataStore();

const all_names = computed(() => list_characters(store.data));
const present_names = computed(() => all_names.value.filter(name => get_character(store.data, name)?.在场));

const is_fallback = computed(() => present_names.value.length === 0);
const list = computed(() => (is_fallback.value ? all_names.value : present_names.value));

const index = ref(0);

watch(list, names => {
  if (index.value >= names.length) {
    index.value = 0;
  }
});

const current = computed(() => list.value[index.value]);
const current_state = computed(() => (current.value ? get_character(store.data, current.value) : undefined));

function prev() {
  if (list.value.length <= 1) return;
  index.value = (index.value - 1 + list.value.length) % list.value.length;
}

function next() {
  if (list.value.length <= 1) return;
  index.value = (index.value + 1) % list.value.length;
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: stretch;
  gap: 6px;
}

.slot {
  flex: 1;
  min-width: 0;
}

.nav {
  flex: 0 0 26px;
  padding: 0;
  background: var(--c-surface-raised);
  border: 1px solid var(--c-border);
  border-radius: 7px;
  color: var(--c-primary);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--c-surface-soft);
  }

  &:disabled {
    color: var(--c-border);
    cursor: default;
  }
}

.dots {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 7px;
}

.dot {
  width: 7px;
  height: 7px;
  padding: 0;
  background: var(--c-track);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &--on {
    background: var(--c-accent);
    transform: scale(1.25);
  }
}

.empty {
  padding: 16px 12px;
  background: var(--c-surface-raised);
  border: 1px dashed var(--c-border);
  border-radius: 7px;
  text-align: center;
}

.empty__title {
  color: var(--c-text);
  font-size: 13px;
  font-weight: 600;
}

.empty__hint {
  margin-top: 3px;
  color: var(--c-text-muted);
  font-size: 11.5px;
}
</style>
