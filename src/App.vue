<template>
  <div class="app-shell">
    <TopBar />

    <main class="app-main">
      <router-view />
    </main>

    <NavBar />
  </div>
</template>

<script setup>
import TopBar from './components/layout/TopBar.vue'
import NavBar from './components/layout/NavBar.vue'
</script>
