<template>
  <section class="page">
    <div class="panel">
      <div class="panel__title">装备库</div>
      <div class="panel__subtitle">
        当前页面已接入真实装备背包。战斗胜利后可获得随机装备。
      </div>

      <div class="stat-row">
        <span class="muted">装备总数</span>
        <span>{{ gameStore.inventory.equipments.length }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">未穿戴装备</span>
        <span>{{ gameStore.unequippedItems.length }}</span>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">装备列表</div>

      <div v-if="gameStore.inventory.equipments.length > 0" class="list">
        <div
          v-for="equipment in gameStore.inventory.equipments"
          :key="equipment.uid"
          class="list-item"
        >
          <div class="stat-row">
            <span :class="getRarityClass(equipment.rarity)">
              [{{ getRarityLabel(equipment.rarity) }}] {{ equipment.name }}
            </span>
            <span>{{ getSlotLabel(equipment.slot) }}</span>
          </div>

          <div class="tag-row">
            <span class="tag">套装：{{ getSetLabel(equipment.set) }}</span>
            <span class="tag">
              主属性：{{ formatMainStat(equipment.mainStat) }}
            </span>
            <span class="tag">
              穿戴者：{{ getEquippedName(equipment.equippedBy) }}
            </span>
          </div>
        </div>
      </div>

      <div v-else class="muted">
        当前还没有任何装备，请先去主线战斗获取。
      </div>
    </div>
  </section>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'
import {
  RARITY_LABELS,
  RARITY_CLASS_MAP,
  EQUIPMENT_SLOT_LABELS,
  EQUIPMENT_SET_LABELS
} from '../utils/constants'

const gameStore = useGameStore()

function getRarityLabel(rarity) {
  return RARITY_LABELS[rarity] || '未知'
}

function getRarityClass(rarity) {
  return RARITY_CLASS_MAP[rarity] || ''
}

function getSlotLabel(slot) {
  return EQUIPMENT_SLOT_LABELS[slot] || slot
}

function getSetLabel(setName) {
  return EQUIPMENT_SET_LABELS[setName] || setName
}

function formatMainStat(mainStat) {
  if (!mainStat) {
    return '-'
  }

  const labelMap = {
    hp: '生命',
    atk: '攻击',
    def: '防御',
    spd: '速度',
    crit: '暴击',
    critDmg: '暴伤'
  }

  return `${labelMap[mainStat.type] || mainStat.type} +${mainStat.value}`
}

function getEquippedName(characterId) {
  if (!characterId) {
    return '未穿戴'
  }

  const character = gameStore.getCharacterById(characterId)
  return character?.name || '未知角色'
}
</script>
