<template>
  <section class="page">
    <div class="panel">
      <div class="panel__title">主线战役</div>
      <div class="panel__subtitle">
        当前章节：{{ gameStore.currentChapterName }}
      </div>

      <div class="stat-row">
        <span class="muted">已通关关卡数</span>
        <span>{{ gameStore.progress.clearedStages.length }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">当前体力</span>
        <span>{{ gameStore.player.energy }}</span>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">章节关卡</div>

      <div v-if="gameStore.chapterStages.length > 0" class="list">
        <div
          v-for="stage in gameStore.chapterStages"
          :key="stage.id"
          class="list-item"
        >
          <div class="stat-row">
            <span>{{ stage.name }}</span>
            <span>{{ gameStore.isStageCleared(stage.id) ? '已通关' : '未通关' }}</span>
          </div>

          <div class="stat-row">
            <span class="muted">推荐战力</span>
            <span>{{ stage.recommendedPower }}</span>
          </div>

          <div class="stat-row">
            <span class="muted">消耗体力</span>
            <span>{{ stage.energyCost }}</span>
          </div>

          <div class="stat-row">
            <span class="muted">常规奖励</span>
            <span>金币 {{ stage.rewards.gold }} / 辉石 {{ stage.rewards.gem }}</span>
          </div>

          <div class="stat-row">
            <span class="muted">首通奖励</span>
            <span>金币 {{ stage.firstClearRewards.gold }} / 辉石 {{ stage.firstClearRewards.gem }}</span>
          </div>

          <div style="margin-top: 12px;">
            <button class="button button--primary button--block" @click="enterStage(stage.id)">
              进入战斗
            </button>
          </div>
        </div>
      </div>

      <div v-else class="muted">
        当前章节暂无可用关卡数据。
      </div>
    </div>

    <div class="panel" v-if="message">
      <div class="panel__title">提示</div>
      <p>{{ message }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import { useBattleStore } from '../stores/battleStore'

const router = useRouter()
const gameStore = useGameStore()
const battleStore = useBattleStore()
const message = ref('')

function enterStage(stageId) {
  const stage = gameStore.getStageById(stageId)

  if (!stage) {
    message.value = '关卡不存在。'
    return
  }

  battleStore.setStage(stage)
  message.value = `已选择关卡：${stage.name}`
  router.push('/battle')
}
</script>
