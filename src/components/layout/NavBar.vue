<template>
  <nav class="navbar">
    <div class="navbar__inner">
      <RouterLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="navbar__item"
        :class="{ active: route.path === item.path }"
      >
        <span>{{ item.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { label: '主城', path: '/' },
  { label: '主线', path: '/story' },
  { label: '召唤', path: '/summon' },
  { label: '角色', path: '/characters' },
  { label: '设置', path: '/settings' }
]
</script>
