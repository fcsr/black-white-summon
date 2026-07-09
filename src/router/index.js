import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import StoryView from '../views/StoryView.vue'
import SummonView from '../views/SummonView.vue'
import CharacterView from '../views/CharacterView.vue'
import CharacterDetailView from '../views/CharacterDetailView.vue'
import EquipmentView from '../views/EquipmentView.vue'
import CodexView from '../views/CodexView.vue'
import BattleView from '../views/BattleView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHashHistory('/black-white-summon/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/story',
      name: 'story',
      component: StoryView
    },
    {
      path: '/summon',
      name: 'summon',
      component: SummonView
    },
    {
      path: '/characters',
      name: 'characters',
      component: CharacterView
    },
    {
      path: '/character/:id',
      name: 'character-detail',
      component: CharacterDetailView
    },
    {
      path: '/equipment',
      name: 'equipment',
      component: EquipmentView
    },
    {
      path: '/codex',
      name: 'codex',
      component: CodexView
    },
    {
      path: '/battle',
      name: 'battle',
      component: BattleView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
  ]
})

export default router
