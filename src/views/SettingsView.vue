<template>
  <section class="page">
    <div class="panel">
      <div class="panel__title">设置与存档</div>
      <div class="panel__subtitle">
        当前版本已接入浏览器本地存档。建议你在重要进度后导出备份。
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">存档管理</div>

      <div class="grid-2" style="margin-bottom: 12px;">
        <button class="button button--block" @click="handleManualSave">
          手动保存
        </button>
        <button class="button button--block" @click="handleExportJson">
          导出 JSON
        </button>
        <button class="button button--block" @click="handleExportText">
          导出文本
        </button>
        <button class="button button--block" @click="handleResetGame">
          清空存档
        </button>
      </div>

      <div class="panel__subtitle">文本导入 / 导出区域</div>
      <textarea
        v-model="saveText"
        class="save-textarea"
        placeholder="这里会显示导出的存档文本，也可以粘贴存档文本后点击“导入文本存档”"
      ></textarea>

      <div style="margin-top: 12px;">
        <button class="button button--primary button--block" @click="handleImportText">
          导入文本存档
        </button>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">当前存档信息</div>
      <div class="stat-row">
        <span class="muted">当前版本</span>
        <span>{{ gameStore.version }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">玩家名</span>
        <span>{{ gameStore.player.name }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">当前章节</span>
        <span>{{ gameStore.currentChapterName }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">已拥有角色数</span>
        <span>{{ gameStore.roster.ownedCharacters.length }}</span>
      </div>
    </div>

    <div class="panel" v-if="message">
      <div class="panel__title">操作结果</div>
      <p>{{ message }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const saveText = ref('')
const message = ref('')

function handleManualSave() {
  const success = gameStore.saveToLocal()
  message.value = success ? '手动保存成功。' : '手动保存失败。'
}

function handleExportJson() {
  gameStore.exportJsonFile()
  message.value = '已开始导出 JSON 存档文件。'
}

function handleExportText() {
  saveText.value = gameStore.exportText()
  message.value = '已生成文本存档，请复制保存。'
}

function handleImportText() {
  try {
    if (!saveText.value.trim()) {
      message.value = '请输入或粘贴有效的存档文本。'
      return
    }

    gameStore.importByText(saveText.value)
    message.value = '文本存档导入成功。'
  } catch (error) {
    console.error(error)
    message.value = '导入失败，请检查文本格式是否正确。'
  }
}

function handleResetGame() {
  const confirmed = window.confirm('确认清空当前存档并重置游戏吗？此操作不可撤销。')

  if (!confirmed) {
    return
  }

  gameStore.resetGame()
  saveText.value = ''
  message.value = '存档已重置为初始状态。'
}
</script>

<style scoped>
.save-textarea {
  width: 100%;
  min-height: 180px;
  resize: vertical;
  border: 1px solid var(--line);
  background: var(--bg-panel);
  color: var(--text);
  border-radius: 12px;
  padding: 12px;
  outline: none;
}

.save-textarea:focus {
  border-color: var(--line-strong);
}
</style>
