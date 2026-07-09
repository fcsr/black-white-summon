<template>
  <RouterLink :to="`/character/${character.id}`" class="character-card">
    <div class="character-card__top">
      <div class="character-card__name">
        <RarityText :rarity="character.rarity" :name="character.name" />
      </div>
      <div class="character-card__level">Lv. {{ character.level }}</div>
    </div>

    <div class="tag-row">
      <span class="tag">{{ character.faction }}</span>
      <span class="tag">{{ character.role }}</span>
      <span class="tag">{{ character.position }}</span>
    </div>
  </RouterLink>
</template>

<script setup>
import RarityText from '../common/RarityText.vue'

defineProps({
  character: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.character-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid var(--line);
  background: var(--bg-panel);
  border-radius: 12px;
  padding: 14px;
  transition: 0.2s ease;
}

.character-card:hover {
  border-color: var(--line-strong);
  background: #25252a;
}

.character-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.character-card__name {
  font-weight: 700;
}

.character-card__level {
  color: var(--text-soft);
  font-size: 13px;
}
</style>
