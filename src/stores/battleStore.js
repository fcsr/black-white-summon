import { defineStore } from 'pinia'
import { runBattle } from '../engine/battleEngine'
import { useGameStore } from './gameStore'

export const useBattleStore = defineStore('battle', {
  state: () => ({
    currentStage: null,
    battleResult: null
  }),

  actions: {
    setStage(stage) {
      this.currentStage = stage
      this.battleResult = null
    },

    clearBattle() {
      this.currentStage = null
      this.battleResult = null
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

      if (result.winner === 'player') {
        gameStore.completeStage(this.currentStage)
      }

      gameStore.autoSave()

      return result
    }
  }
})
