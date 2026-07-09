<template>
  <section class="page">
    <div class="panel">
      <div class="panel__title">战斗记录</div>
      <div class="panel__subtitle">
        采用自动回合制。点击开始战斗后，将自动生成战报与结算。
      </div>
    </div>

    <div v-if="battleStore.currentStage" class="panel">
      <div class="panel__title">当前关卡</div>

      <div class="stat-row">
        <span class="muted">关卡名称</span>
        <span>{{ battleStore.currentStage.name }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">推荐战力</span>
        <span>{{ battleStore.currentStage.recommendedPower }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">消耗体力</span>
        <span>{{ battleStore.currentStage.energyCost }}</span>
      </div>
    </div>

    <div v-if="battleStore.currentStage" class="panel">
      <div class="panel__title">双方阵容</div>

      <div class="grid-2">
        <div class="list-item">
          <div class="panel__subtitle">我方</div>
          <div class="list">
            <div v-for="character in gameStore.currentTeamCharacters" :key="character.id">
              <RarityText :rarity="character.rarity" :name="character.name" />
              <span class="muted"> · Lv. {{ character.level }}</span>
            </div>
          </div>
        </div>

        <div class="list-item">
          <div class="panel__subtitle">敌方</div>
          <div class="list">
            <div v-for="enemy in battleStore.currentStage.enemyTeam" :key="enemy.id">
              {{ enemy.name }}
              <span class="muted"> · Lv. {{ enemy.level }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="battleStore.currentStage" class="panel">
      <div class="grid-2">
        <button class="button button--primary button--block" @click="handleStartBattle">
          开始战斗
        </button>
        <button class="button button--block" @click="handleBackToStory">
          返回主线
        </button>
      </div>
    </div>

    <div v-if="battleStore.battleResult" class="panel">
      <div class="panel__title">战斗结果</div>

      <div class="stat-row">
        <span class="muted">胜负</span>
        <span>{{ resultText }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">总回合数</span>
        <span>{{ battleStore.battleResult.rounds }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">战后金币</span>
        <span>{{ gameStore.player.gold }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">战后辉石</span>
        <span>{{ gameStore.player.gem }}</span>
      </div>
    </div>

    <div v-if="battleStore.battleResult" class="panel">
      <div class="panel__title">战报</div>

      <div class="list">
        <div
          v-for="(log, index) in battleStore.battleResult.logs"
          :key="index"
          class="list-item"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <div v-if="message" class="panel">
      <div class="panel__title">提示</div>
      <p>{{ message }}</p>
    </div>

    <div v-if="!battleStore.currentStage" class="panel">
      <div class="panel__title">暂无关卡</div>
      <div class="panel__subtitle">请先从主线页面选择一个关卡进入战斗。</div>
      <button class="button button--block" @click="handleBackToStory">
        前往主线
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import { useBattleStore } from '../stores/battleStore'
import RarityText from '../components/common/RarityText.vue'

const router = useRouter()
const gameStore = useGameStore()
const battleStore = useBattleStore()
const message = ref('')

const resultText = computed(() => {
  if (!battleStore.battleResult) {
    return ''
  }

  if (battleStore.battleResult.winner === 'player') {
    return '我方胜利'
  }

  if (battleStore.battleResult.winner === 'enemy') {
    return '敌方胜利'
  }

  return '平局'
})

function handleStartBattle() {
  try {
    const result = battleStore.startBattle()

    if (result.winner === 'player') {
      message.value = '战斗胜利，奖励已结算。'
    } else {
      message.value = '战斗失败，本次未获得通关奖励。'
    }
  } catch (error) {
    console.error(error)
    message.value = error.message || '战斗启动失败。'
  }
}

function handleBackToStory() {
  router.push('/story')
}
</script>
