<template>
  <div v-if="visible" class="modal-mask" @click.self="$emit('close')">
    <div class="modal-panel">
      <div class="panel__title">召唤结果</div>
      <div class="panel__subtitle">
        本次共获得 {{ results.length }} 个结果。
      </div>

      <div class="list">
        <div
          v-for="(entry, index) in results"
          :key="`${entry.template.id}-${index}`"
          class="list-item"
        >
          <div class="stat-row">
            <RarityText
              :rarity="entry.template.rarity"
              :name="entry.template.name"
            />
            <span>{{ entry.isDuplicate ? '重复' : '新获得' }}</span>
          </div>
          <div class="muted">
            {{ entry.template.faction }} · {{ entry.template.role }} · {{ entry.template.position }}
          </div>
        </div>
      </div>

      <div style="margin-top: 12px;">
        <button class="button button--primary button--block" @click="$emit('close')">
          确认
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import RarityText from '../common/RarityText.vue'

defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  results: {
    type: Array,
    default: () => []
  }
})

defineEmits(['close'])
</script>

<style scoped>
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 120;
  padding: 16px;
}

.modal-panel {
  width: 100%;
  max-width: 620px;
  max-height: 80vh;
  overflow-y: auto;
  background: #171719;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 16px;
  box-shadow: var(--shadow);
}
</style>
