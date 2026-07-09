<template>
  <section class="page">
    <div class="panel">
      <div class="panel__title">记录者主页</div>
      <div class="panel__subtitle">
        当色彩熄灭，名字便成了力量。
      </div>

      <div class="list">
        <div class="list-item">
          <div class="stat-row">
            <span class="muted">玩家身份</span>
            <span>{{ gameStore.player.name }}</span>
          </div>
          <div class="stat-row">
            <span class="muted">当前章节</span>
            <span>{{ gameStore.currentChapterName }}</span>
          </div>
          <div class="stat-row">
            <span class="muted">当前战力</span>
            <span>{{ gameStore.currentPower }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">功能入口</div>
      <div class="grid-2">
        <RouterLink to="/story" class="action-card">
          <div class="action-card__title">主线战役</div>
          <div class="action-card__desc">推进章节，解锁更多敌人与奖励。</div>
        </RouterLink>

        <RouterLink to="/summon" class="action-card">
          <div class="action-card__title">召唤之书</div>
          <div class="action-card__desc">招募新的作战单位，扩充图鉴。</div>
        </RouterLink>

        <RouterLink to="/characters" class="action-card">
          <div class="action-card__title">角色名录</div>
          <div class="action-card__desc">查看角色属性、职业与稀有度。</div>
        </RouterLink>

        <RouterLink to="/equipment" class="action-card">
          <div class="action-card__title">装备库</div>
          <div class="action-card__desc">管理武器、防具与套装效果。</div>
        </RouterLink>

        <RouterLink to="/codex" class="action-card">
          <div class="action-card__title">图鉴档案</div>
          <div class="action-card__desc">浏览已发现与未发现的角色。</div>
        </RouterLink>

        <RouterLink to="/settings" class="action-card">
          <div class="action-card__title">设置与存档</div>
          <div class="action-card__desc">管理本地保存、导出、导入与清档。</div>
        </RouterLink>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">当前队伍</div>
      <div class="tag-row">
        <span
          v-for="character in gameStore.currentTeamCharacters"
          :key="character.id"
          class="tag"
          :class="getRarityClass(character.rarity)"
        >
          [{{ getRarityLabel(character.rarity) }}] {{ character.name }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'
import { RARITY_LABELS, RARITY_CLASS_MAP } from '../utils/constants'

const gameStore = useGameStore()

function getRarityLabel(rarity) {
  return RARITY_LABELS[rarity] || '未知'
}

function getRarityClass(rarity) {
  return RARITY_CLASS_MAP[rarity] || ''
}
</script>
