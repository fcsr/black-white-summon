<template>
  <section class="page">
    <div class="panel">
      <div class="panel__title">召唤之书</div>
      <div class="panel__subtitle">
        已接入常驻召唤。消耗召唤券进行单抽或十连，重复角色将自动转化为金币。
      </div>

      <div class="list">
        <div class="list-item">
          <div class="stat-row">
            <span class="muted">常驻召唤券</span>
            <span>{{ gameStore.summon.tickets }}</span>
          </div>
          <div class="stat-row">
            <span class="muted">史诗保底进度</span>
            <span>{{ gameStore.summon.pityEpic }} / 50</span>
          </div>
          <div class="stat-row">
            <span class="muted">传说保底进度</span>
            <span>{{ gameStore.summon.pityLegend }} / 200</span>
          </div>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">召唤操作</div>
      <div class="grid-2">
        <button class="button button--block" @click="handleSummon(1)">
          单次召唤
        </button>
        <button class="button button--primary button--block" @click="handleSummon(10)">
          十连召唤
        </button>
      </div>
    </div>

    <div class="panel" v-if="message">
      <div class="panel__title">召唤反馈</div>
      <p>{{ message }}</p>
    </div>

    <div class="panel">
      <div class="panel__title">最近召唤记录</div>
      <div class="list">
        <div
          v-for="(log, index) in gameStore.summon.logs"
          :key="index"
          class="list-item"
        >
          {{ log }}
        </div>
      </div>
    </div>

    <SummonResultModal
      :visible="showResultModal"
      :results="latestResults"
      @close="showResultModal = false"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useGameStore } from '../stores/gameStore'
import SummonResultModal from '../components/summon/SummonResultModal.vue'

const gameStore = useGameStore()
const message = ref('')
const showResultModal = ref(false)
const latestResults = ref([])

function handleSummon(count) {
  try {
    const results = gameStore.performStandardSummon(count)
    latestResults.value = results
    showResultModal.value = true
    message.value = `召唤成功，本次完成 ${count} 次召唤。`
  } catch (error) {
    console.error(error)
    message.value = error.message || '召唤失败。'
  }
}
</script>
