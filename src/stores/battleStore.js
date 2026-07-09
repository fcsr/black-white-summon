import { defineStore } from 'pinia'
import { runBattle } from '../engine/battleEngine'
import { useGameStore } from './gameStore'
import { rollBattleEquipments } from '../engine/equipmentEngine'

export const useBattleStore = defineStore('battle', {
  state: () => ({
    currentStage: null,
    battleResult: null,
    latestDrops: []
  }),

  actions: {
    setStage(stage) {
      this.currentStage = stage
      this.battleResult = null
      this.latestDrops = []
    },

    clearBattle() {
      this.currentStage = null
      this.battleResult = null
      this.latestDrops = []
    },

    startBattle() {
      const gameStore = useGameStore()

      if (!this.currentStage) {
        throw new Error('当前没有可挑战的关卡')
      }

      if (gameStore.player.energy < this.currentStage.energyCost) {
        throw new Error('体力不足')
      }

      gameStore.consumeEnergy(this.currentStage.energyCost)

      const result = runBattle(
        gameStore.currentTeamCharacters,
        this.currentStage.enemyTeam
      )

      this.battleResult = result
      this.latestDrops = []

      if (result.winner === 'player') {
        gameStore.completeStage(this.currentStage)

        const dropCount = Math.random() < 0.7 ? 1 : 2
        const drops = rollBattleEquipments(gameStore.databases.equipments, dropCount)
        this.latestDrops = drops
        gameStore.addEquipments(drops)
      }

      gameStore.autoSave()

      return result
    }
  }
})
