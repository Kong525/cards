<template>
  <div class="grid">
    <TargetCell v-for="name in TARGETS" :key="name" :name="name" />
  </div>
</template>

<script setup lang="ts">
import TargetCell from './TargetCell.vue';
import { TARGETS } from '../store';
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
  gap: 8px;
}
</style>
