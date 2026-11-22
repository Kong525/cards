<template>
  <div class="panel">
    <div class="panel__head">
      <span class="panel__label"><i class="fa-solid fa-microchip"></i> 心海洗脑系统</span>
      <span class="panel__owner">{{ sys.持有者 }}</span>
    </div>

    <div class="energy">
      <div class="energy__top">
        <span class="energy__k">淫能</span>
        <span class="energy__v" :class="{ 'is-low': energy <= 10 }">{{ energy }}<i> / {{ cap }}</i></span>
        <span class="energy__pts"><i class="fa-solid fa-coins"></i> 淫点 {{ points }}</span>
      </div>
      <div class="bar">
        <div class="bar__fill" :style="{ width: `${fill_pct}%` }"></div>
        <span v-if="cap >= 100" class="bar__tick"><i>30</i></span>
      </div>
      <div v-if="cap < 100" class="energy__note">淫能储存半损坏，超过 {{ cap }} 的部分存不住</div>
    </div>

    <div class="plates">
      <div v-for="p in plates" :key="p.name" class="plate" :class="`plate--${p.tone}`">
        <span class="plate__name">{{ p.name }}</span>
        <span class="plate__state">{{ p.state }}</span>
      </div>
    </div>

    <div class="queue">
      <div class="queue__head">
        <span>修复队列</span>
        <span class="queue__sum">{{ queue.length ? `${queue.length} 块在修` : '空' }}</span>
      </div>
      <div v-if="queue.length === 0" class="queue__empty">没在修。要修哪块，得先攒够淫能。</div>
      <div v-for="q in queue" :key="q.name" class="row">
        <span class="row__name">{{ q.name }}</span>
        <div class="row__bar"><div class="row__fill" :style="{ width: `${q.pct}%` }"></div></div>
        <span class="row__num">{{ q.invested }} / {{ q.cost }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { energy_cap, PLATE_COST, PLATE_ORDER, PLATE_TONE, useDataStore } from '../store';

const store = useDataStore();
const sys = computed(() => store.data.系统);
const hero = computed(() => store.data.主角);

const energy = computed(() => hero.value.淫能);
const points = computed(() => hero.value.淫点);
const cap = computed(() => energy_cap(sys.value.板块完好度));
const fill_pct = computed(() => Math.max(0, Math.min(100, (energy.value / cap.value) * 100)));

const plates = computed(() =>
  PLATE_ORDER.map(name => ({
    name,
    state: sys.value.板块完好度[name] ?? '损坏',
    tone: PLATE_TONE[sys.value.板块完好度[name] ?? '损坏'],
  })),
);

const queue = computed(() =>
  Object.entries(sys.value.修复队列)
    .filter(([name]) => PLATE_ORDER.includes(name))
    .map(([name, invested]) => {
      const cost = PLATE_COST[name] ?? 100;
      return { name, invested, cost, pct: Math.max(0, Math.min(100, (invested / cost) * 100)) };
    }),
);
</script>

<style lang="scss" scoped>
.panel {
  margin-top: 9px;
  padding: 8px 10px 9px;
  background: var(--c-surface-raised);
  border: 1px solid var(--c-border);
  border-radius: 7px;
}

.panel__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.panel__label {
  color: var(--c-system);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.panel__owner {
  padding: 0 7px;
  border: 1px solid var(--c-system);
  border-radius: 999px;
  color: var(--c-system);
  font-size: 10.5px;
}

.energy {
  margin-top: 7px;
}

.energy__top {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.energy__k {
  color: var(--c-text-muted);
  font-size: 11.5px;
}

.energy__v {
  font-size: 19px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;

  i {
    color: var(--c-text-muted);
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
  }

  &.is-low {
    color: var(--c-danger);
  }
}

.energy__pts {
  margin-left: auto;
  color: var(--c-warn);
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
}

.bar {
  position: relative;
  height: 8px;
  margin-top: 5px;
  background: var(--c-track);
  border-radius: 4px;
}

.bar__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--c-system), var(--c-primary));
  border-radius: 4px;
  transition: width 0.5s ease;
}

.bar__tick {
  position: absolute;
  top: -2px;
  left: 30%;
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
}

.energy__note {
  margin-top: 11px;
  color: var(--c-warn);
  font-size: 11px;
}

.plates {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px 6px;
  margin-top: 12px;
}

.plate {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 6px;
  padding: 2px 7px;
  background: var(--c-surface-soft);
  border-left: 2px solid var(--c-border);
  border-radius: 4px;
  font-size: 11.5px;
}

.plate__name {
  color: var(--c-text);
}

.plate__state {
  color: var(--c-text-muted);
  font-size: 10.5px;
}

.plate--ok {
  border-left-color: var(--c-system);

  .plate__state {
    color: var(--c-system);
  }
}

.plate--warn {
  border-left-color: var(--c-warn);

  .plate__state {
    color: var(--c-warn);
  }
}

.plate--danger {
  border-left-color: var(--c-danger);

  .plate__state {
    color: var(--c-danger);
  }
}

.queue {
  margin-top: 9px;
  padding-top: 7px;
  border-top: 1px dashed var(--c-border);
}

.queue__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  color: var(--c-text-muted);
  font-size: 11.5px;
}

.queue__sum {
  color: var(--c-primary);
}

.queue__empty {
  margin-top: 3px;
  color: var(--c-text-muted);
  font-size: 11px;
}

.row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}

.row__name {
  flex: 0 0 68px;
  font-size: 11.5px;
}

.row__bar {
  flex: 1;
  height: 5px;
  background: var(--c-track);
  border-radius: 3px;
}

.row__fill {
  height: 100%;
  background: var(--c-primary);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.row__num {
  flex: 0 0 auto;
  color: var(--c-text-muted);
  font-size: 10.5px;
  font-variant-numeric: tabular-nums;
}
</style>
