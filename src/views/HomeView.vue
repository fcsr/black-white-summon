<template>
  <section class="page">
    <div class="panel">
      <div class="panel__title">记录者主页</div>
      <div class="panel__subtitle">
        当色彩熄灭，名字便成了力量。
      </div>

      <div class="list">
        <div class="list-item">
          <div class="stat-row">
            <span class="muted">玩家身份</span>
            <span>记录者</span>
          </div>
          <div class="stat-row">
            <span class="muted">当前章节</span>
            <span>第一章 · 失色边境</span>
          </div>
          <div class="stat-row">
            <span class="muted">当前战力</span>
            <span>1320</span>
          </div>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">功能入口</div>
      <div class="grid-2">
        <RouterLink to="/story" class="action-card">
          <div class="action-card__title">主线战役</div>
          <div class="action-card__desc">推进章节，解锁更多敌人与奖励。</div>
        </RouterLink>

        <RouterLink to="/summon" class="action-card">
          <div class="action-card__title">召唤之书</div>
          <div class="action-card__desc">招募新的作战单位，扩充图鉴。</div>
        </RouterLink>

        <RouterLink to="/characters" class="action-card">
          <div class="action-card__title">角色名录</div>
          <div class="action-card__desc">查看角色属性、职业与稀有度。</div>
        </RouterLink>

        <RouterLink to="/equipment" class="action-card">
          <div class="action-card__title">装备库</div>
          <div class="action-card__desc">管理武器、防具与套装效果。</div>
        </RouterLink>

        <RouterLink to="/codex" class="action-card">
          <div class="action-card__title">图鉴档案</div>
          <div class="action-card__desc">浏览已发现与未发现的角色。</div>
        </RouterLink>

        <RouterLink to="/settings" class="action-card">
          <div class="action-card__title">设置与存档</div>
          <div class="action-card__desc">后续将在这里管理导出、导入与清档。</div>
        </RouterLink>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">当前队伍</div>
      <div class="tag-row">
        <span class="tag rarity-epic">[史诗] 夜祷祭司</span>
        <span class="tag rarity-legend">[传说] 失光审判官</span>
        <span class="tag rarity-elite">[卓越] 灰烬持盾者</span>
        <span class="tag rarity-rare">[稀有] 荒原猎手</span>
        <span class="tag rarity-normal">[普通] 见习卫兵</span>
      </div>
    </div>
  </section>
</template>
