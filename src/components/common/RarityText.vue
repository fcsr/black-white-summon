<template>
  <span :class="rarityClass">
    [{{ rarityLabel }}] {{ name }}
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { RARITY_LABELS, RARITY_CLASS_MAP } from '../../utils/constants'

const props = defineProps({
  rarity: {
    type: String,
    default: 'normal'
  },
  name: {
    type: String,
    default: ''
  }
})

const rarityLabel = computed(() => {
  return RARITY_LABELS[props.rarity] || '未知'
})

const rarityClass = computed(() => {
  return RARITY_CLASS_MAP[props.rarity] || ''
})
</script>
