<template>
  <section class="page">
    <div class="panel">
      <div class="panel__title">设置与存档</div>
      <div class="panel__subtitle">
        后续这里将接入本地自动保存、手动导出、导入与清档功能。
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">存档管理</div>
      <div class="grid-2">
        <button class="button button--block">手动保存</button>
        <button class="button button--block">导出存档</button>
        <button class="button button--block">导入存档</button>
        <button class="button button--block">清空存档</button>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">版本信息</div>
      <div class="stat-row">
        <span class="muted">当前版本</span>
        <span>0.0.1</span>
      </div>
      <div class="stat-row">
        <span class="muted">部署方式</span>
        <span>GitHub Pages</span>
      </div>
      <div class="stat-row">
        <span class="muted">存档方式</span>
        <span>浏览器本地存档</span>
      </div>
    </div>
  </section>
</template>
