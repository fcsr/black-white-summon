<template>
  <section class="page" v-if="character">
    <div class="panel">
      <div class="panel__title">角色详情</div>
      <div class="panel__subtitle">
        查看角色基础信息。后续这里会继续接入升级、装备、技能与升星系统。
      </div>
    </div>

    <div class="panel">
      <div class="detail-header">
        <div>
          <div class="detail-name">
            <RarityText :rarity="character.rarity" :name="character.name" />
          </div>
          <div class="detail-sub muted">
            {{ character.faction }} · {{ character.role }} · {{ character.position }}
          </div>
        </div>

        <div class="detail-level">
          Lv. {{ character.level }}
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">基础属性</div>

      <div class="stat-row">
        <span class="muted">生命</span>
        <span>{{ computedStats.hp }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">攻击</span>
        <span>{{ computedStats.atk }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">防御</span>
        <span>{{ computedStats.def }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">速度</span>
        <span>{{ computedStats.spd }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">暴击率</span>
        <span>{{ computedStats.crit }}%</span>
      </div>
      <div class="stat-row">
        <span class="muted">暴击伤害</span>
        <span>{{ computedStats.critDmg }}%</span>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">角色档案</div>

      <div class="stat-row">
        <span class="muted">角色编号</span>
        <span>{{ character.id }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">阵营</span>
        <span>{{ character.faction }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">职业</span>
        <span>{{ character.role }}</span>
      </div>
      <div class="stat-row">
        <span class="muted">站位</span>
        <span>{{ character.position }}</span>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">后续功能预留</div>
      <div class="tag-row">
        <span class="tag">升级</span>
        <span class="tag">装备</span>
        <span class="tag">技能</span>
        <span class="tag">升星</span>
        <span class="tag">编队</span>
      </div>
    </div>
  </section>

  <section class="page" v-else>
    <div class="panel">
      <div class="panel__title">未找到角色</div>
      <div class="panel__subtitle">该角色不存在，或当前存档中未拥有此角色。</div>
      <RouterLink to="/characters" class="button button--block">返回角色页</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import RarityText from '../components/common/RarityText.vue'

const route = useRoute()
const gameStore = useGameStore()

const character = computed(() => {
  return gameStore.getCharacterById(route.params.id)
})

const computedStats = computed(() => {
  if (!character.value) {
    return {
      hp: 0,
      atk: 0,
      def: 0,
      spd: 0,
      crit: 0,
      critDmg: 0
    }
  }

  const level = character.value.level

  return {
    hp: 900 + level * 85,
    atk: 70 + level * 7,
    def: 45 + level * 4,
    spd: 90 + Math.floor(level / 6),
    crit: 10 + Math.floor(level / 12),
    critDmg: 150
  }
})
</script>

<style scoped>
.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.detail-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}

.detail-sub {
  font-size: 13px;
}

.detail-level {
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  border-radius: 999px;
  padding: 8px 12px;
  white-space: nowrap;
}
</style>
