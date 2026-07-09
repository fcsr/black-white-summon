<template>
  <section class="page">
    <div class="panel">
      <div class="panel__title">召唤之书</div>
      <div class="panel__subtitle">
        首版先提供静态界面，后续接入真实抽卡逻辑与保底计数。
      </div>

      <div class="list">
        <div class="list-item">
          <div class="stat-row">
            <span class="muted">常驻召唤券</span>
            <span>12</span>
          </div>
          <div class="stat-row">
            <span class="muted">史诗保底进度</span>
            <span>7 / 50</span>
          </div>
          <div class="stat-row">
            <span class="muted">传说保底进度</span>
            <span>31 / 200</span>
          </div>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">召唤操作</div>
      <div class="grid-2">
        <button class="button button--block">单次召唤</button>
        <button class="button button--primary button--block">十连召唤</button>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">最近召唤记录</div>
      <div class="list">
        <div class="list-item">
          你翻开书页，召来了 <span class="rarity-rare">[稀有] 荒原猎手</span>
        </div>
        <div class="list-item">
          书页间浮现古老誓词：<span class="rarity-epic">[史诗] 夜祷祭司</span>
        </div>
        <div class="list-item">
          封印震颤，钟声响起：<span class="rarity-legend">[传说] 失光审判官</span>
        </div>
      </div>
    </div>
  </section>
</template>
