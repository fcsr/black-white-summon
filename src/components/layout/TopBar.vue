<template>
  <header class="topbar">
    <div class="topbar__inner">
      <div class="topbar__title">黑白召唤</div>

      <div class="topbar__resources">
        <div class="resource-pill">金币 {{ gameStore.player.gold }}</div>
        <div class="resource-pill">辉石 {{ gameStore.player.gem }}</div>
        <div class="resource-pill">体力 {{ gameStore.player.energy }}</div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useGameStore } from '../../stores/gameStore'

const gameStore = useGameStore()
</script>
