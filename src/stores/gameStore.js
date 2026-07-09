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
import { GAME_VERSION, DUPLICATE_GOLD_REWARD, RARITY_LABELS } from '../utils/constants'
import { loadCharacters, loadSummonPools } from '../engine/dataLoader'
import { performSummon } from '../engine/summonEngine'

export const useGameStore = defineStore('game', {
  state: () => ({
    initialized: false,
    staticDataLoaded: false,
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
    },
    databases: {
      characters: [],
      summonPools: {}
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
    async initializeGame() {
      const loaded = loadSaveData()

      if (loaded) {
        this.applySaveData(loaded)
      } else {
        const initialData = createInitialSave()
        this.applySaveData(initialData)
        saveGameData(this.getSaveData())
      }

      await this.loadStaticData()
      this.initialized = true
    },

    async loadStaticData() {
      if (this.staticDataLoaded) {
        return
      }

      try {
        const [characters, summonPools] = await Promise.all([
          loadCharacters(),
          loadSummonPools()
        ])

        this.databases.characters = characters
        this.databases.summonPools = summonPools
        this.staticDataLoaded = true
      } catch (error) {
        console.error('静态数据加载失败：', error)
      }
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

    getCharacterById(id) {
      return this.roster.ownedCharacters.find((character) => character.id === id) || null
    },

    addCharacterToRoster(character) {
      this.roster.ownedCharacters.push(character)
    },

    addSummonLog(text) {
      this.summon.logs.unshift(text)
      this.summon.logs = this.summon.logs.slice(0, 20)
    },

    performStandardSummon(drawCount = 1) {
      if (!this.staticDataLoaded) {
        throw new Error('静态数据尚未加载完成')
      }

      const pool = this.databases.summonPools.standard
      const totalCost = drawCount * pool.costPerDraw

      if (this.summon.tickets < totalCost) {
        throw new Error('召唤券不足')
      }

      const summonResult = performSummon({
        drawCount,
        roster: this.roster.ownedCharacters,
        summonState: this.summon,
        poolConfig: pool,
        characterTemplates: this.databases.characters
      })

      this.summon.tickets -= totalCost
      this.summon.pityEpic = summonResult.pityEpic
      this.summon.pityLegend = summonResult.pityLegend

      summonResult.results.forEach((entry) => {
        const rarityLabel = RARITY_LABELS[entry.template.rarity] || '未知'
        const logText = `你召来了 [${rarityLabel}] ${entry.template.name}`

        if (entry.isDuplicate) {
          const goldReward = DUPLICATE_GOLD_REWARD[entry.template.rarity] || 0
          this.player.gold += goldReward
          this.addSummonLog(`${logText}（重复，转化为 ${goldReward} 金币）`)
        } else {
          this.addCharacterToRoster(entry.ownedCharacter)
          this.addSummonLog(logText)
        }
      })

      this.autoSave()

      return summonResult.results
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
