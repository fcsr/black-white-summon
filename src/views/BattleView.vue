<template>
  <section class="page">
    <div class="panel">
      <div class="panel__title">战斗记录</div>
      <div class="panel__subtitle">
        首版将采用纯文字自动回合制战报。
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">双方阵容</div>
      <div class="grid-2">
        <div class="list-item">
          <div class="panel__subtitle">我方</div>
          <div class="list">
            <div> <span class="rarity-legend">[传说] 失光审判官</span> </div>
            <div> <span class="rarity-epic">[史诗] 夜祷祭司</span> </div>
            <div> <span class="rarity-elite">[卓越] 灰烬持盾者</span> </div>
          </div>
        </div>

        <div class="list-item">
          <div class="panel__subtitle">敌方</div>
          <div class="list">
            <div>[敌] 荒骨屠夫</div>
            <div>[敌] 枯井侍从</div>
            <div>[敌] 无名行尸</div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel__title">战报示例</div>
      <div class="list">
        <div class="list-item">
          第1回合：<span class="rarity-legend">失光审判官</span> 施放【裁决刻印】，对荒骨屠夫造成 842 点伤害，并附加【防御下降】2回合。
        </div>
        <div class="list-item">
          第1回合：荒骨屠夫施放【碎骨重击】，对灰烬持盾者造成 611 点伤害。
        </div>
        <div class="list-item">
          第2回合：<span class="rarity-epic">夜祷祭司</span> 施放【低语祷告】，恢复灰烬持盾者 520 点生命。
        </div>
      </div>
    </div>

    <div class="panel">
      <button class="button button--primary button--block">开始战斗（后续接入逻辑）</button>
    </div>
  </section>
</template>
