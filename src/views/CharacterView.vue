<template>
  <section class="page">
    <div class="panel">
      <div class="panel__title">角色名录</div>
      <div class="panel__subtitle">
        当前页面已接入真实角色数据。点击角色卡片可查看详情。
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">编队概览</div>

      <div class="stat-row">
        <span class="muted">已拥有角色数</span>
        <span>{{ gameStore.roster.ownedCharacters.length }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">当前上阵人数</span>
        <span>{{ gameStore.currentTeamCharacters.length }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">当前队伍战力</span>
        <span>{{ gameStore.currentPower }}</span>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">已拥有角色</div>

      <div class="character-list">
        <CharacterCard
          v-for="character in gameStore.roster.ownedCharacters"
          :key="character.id"
          :character="character"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'
import CharacterCard from '../components/character/CharacterCard.vue'

const gameStore = useGameStore()
</script>

<style scoped>
.character-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
