import { defineStore } from 'pinia'
import {
  createInitialSave,
  loadSaveData,
  saveGameData,
  removeSaveData,
  exportSaveAsJson,
  exportSaveAsText,
  importSaveFromText
} from '../engine/saveManager'
import { GAME_VERSION } from '../utils/constants'

export const useGameStore = defineStore('game', {
  state: () => ({
    initialized: false,
    version: GAME_VERSION,
    player: {
      name: '',
      gold: 0,
      gem: 0,
      energy: 0
    },
    progress: {
      currentChapter: 1,
      clearedStages: []
    },
    roster: {
      ownedCharacters: [],
      currentTeam: []
    },
    inventory: {
      items: [],
      equipments: []
    },
    summon: {
      pityEpic: 0,
      pityLegend: 0,
      tickets: 0,
      logs: []
    },
    settings: {
      autoSave: true,
      textSpeed: 1
    }
  }),

  getters: {
    currentChapterName(state) {
      const chapterMap = {
        1: '第一章 · 失色边境',
        2: '第二章 · 白塔余烬',
        3: '第三章 · 深井回声'
      }

      return chapterMap[state.progress.currentChapter] || '未知章节'
    },

    currentPower(state) {
      return state.roster.ownedCharacters.reduce((total, character) => {
        return total + character.level * 12
      }, 0)
    },

    currentTeamCharacters(state) {
      return state.roster.currentTeam
        .map((id) =>
          state.roster.ownedCharacters.find((character) => character.id === id)
        )
        .filter(Boolean)
    }
  },

  actions: {
    initializeGame() {
      const loaded = loadSaveData()

      if (loaded) {
        this.applySaveData(loaded)
      } else {
        const initialData = createInitialSave()
        this.applySaveData(initialData)
        saveGameData(this.getSaveData())
      }

      this.initialized = true
    },

    applySaveData(data) {
      this.version = data.version || GAME_VERSION
      this.player = data.player || this.player
      this.progress = data.progress || this.progress
      this.roster = data.roster || this.roster
      this.inventory = data.inventory || this.inventory
      this.summon = data.summon || this.summon
      this.settings = data.settings || this.settings
    },

    getSaveData() {
      return {
        version: this.version,
        player: this.player,
        progress: this.progress,
        roster: this.roster,
        inventory: this.inventory,
        summon: this.summon,
        settings: this.settings
      }
    },

    saveToLocal() {
      return saveGameData(this.getSaveData())
    },

    autoSave() {
      if (this.settings.autoSave) {
        this.saveToLocal()
      }
    },

    addGold(amount) {
      this.player.gold += amount
      this.autoSave()
    },

    addGem(amount) {
      this.player.gem += amount
      this.autoSave()
    },

    consumeEnergy(amount) {
      this.player.energy = Math.max(0, this.player.energy - amount)
      this.autoSave()
    },

    restoreEnergy(amount) {
      this.player.energy += amount
      this.autoSave()
    },

    exportJsonFile() {
      exportSaveAsJson(this.getSaveData())
    },

    exportText() {
      return exportSaveAsText(this.getSaveData())
    },

    importByText(text) {
      const parsed = importSaveFromText(text)
      this.applySaveData(parsed)
      this.saveToLocal()
    },

    resetGame() {
      removeSaveData()
      const initialData = createInitialSave()
      this.applySaveData(initialData)
      this.saveToLocal()
    }
  }
})
