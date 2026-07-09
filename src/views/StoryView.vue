<template>
  <section class="page">
    <div class="panel">
      <div class="panel__title">主线战役</div>
      <div class="panel__subtitle">
        先用静态章节占位，后续接入关卡数据和战斗系统。
      </div>

      <div class="list">
        <div class="list-item">
          <div class="stat-row">
            <span>第一章 · 失色边境</span>
            <span class="muted">进度 3 / 8</span>
          </div>
          <p class="muted">边境的哨站已沉入灰雾，第一批无名者正在集结。</p>
        </div>

        <div class="list-item">
          <div class="stat-row">
            <span>第二章 · 白塔余烬</span>
            <span class="muted">未解锁</span>
          </div>
          <p class="muted">白塔议会的残卷正在失真，更多秘密等待记录。</p>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">关卡入口示例</div>
      <div class="grid-2">
        <RouterLink to="/battle" class="action-card">
          <div class="action-card__title">1-1 失色哨站</div>
          <div class="action-card__desc">推荐战力 500</div>
        </RouterLink>

        <RouterLink to="/battle" class="action-card">
          <div class="action-card__title">1-2 灰雾道路</div>
          <div class="action-card__desc">推荐战力 650</div>
        </RouterLink>

        <RouterLink to="/battle" class="action-card">
          <div class="action-card__title">1-3 无名营地</div>
          <div class="action-card__desc">推荐战力 800</div>
        </RouterLink>

        <RouterLink to="/battle" class="action-card">
          <div class="action-card__title">1-4 边境裂口</div>
          <div class="action-card__desc">推荐战力 1000</div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
