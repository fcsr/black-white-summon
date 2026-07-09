function getBaseStatsByCharacter(unit) {
  const level = unit.level || 1
  const rarityModifierMap = {
    normal: 0.9,
    rare: 1,
    elite: 1.12,
    epic: 1.28,
    legend: 1.45,
    myth: 1.65
  }

  const modifier = rarityModifierMap[unit.rarity] || 1

  return {
    maxHp: Math.floor((800 + level * 85) * modifier),
    atk: Math.floor((65 + level * 7) * modifier),
    def: Math.floor((40 + level * 4) * modifier),
    spd: Math.floor((90 + level) * modifier)
  }
}

function buildBattleUnit(unit, side) {
  const stats = getBaseStatsByCharacter(unit)

  return {
    id: unit.id,
    name: unit.name,
    rarity: unit.rarity,
    role: unit.role,
    position: unit.position,
    level: unit.level,
    side,
    hp: stats.maxHp,
    maxHp: stats.maxHp,
    atk: stats.atk,
    def: stats.def,
    spd: stats.spd,
    alive: true
  }
}

function getAliveUnits(units) {
  return units.filter((unit) => unit.alive)
}

function pickTarget(units) {
  const aliveUnits = getAliveUnits(units)
  const frontRow = aliveUnits.filter((unit) => unit.position === '前排')

  if (frontRow.length > 0) {
    return frontRow[0]
  }

  return aliveUnits[0] || null
}

function calculateDamage(attacker, defender) {
  const randomFactor = 0.95 + Math.random() * 0.1
  const rawDamage = attacker.atk * (100 / (100 + defender.def)) * randomFactor
  return Math.max(1, Math.floor(rawDamage))
}

function attackTarget(attacker, defender) {
  const damage = calculateDamage(attacker, defender)
  defender.hp = Math.max(0, defender.hp - damage)

  if (defender.hp <= 0) {
    defender.alive = false
  }

  return damage
}

export function runBattle(playerTeam, enemyTeam) {
  const battlePlayerTeam = playerTeam.map((unit) => buildBattleUnit(unit, 'player'))
  const battleEnemyTeam = enemyTeam.map((unit) => buildBattleUnit(unit, 'enemy'))

  const logs = []
  let round = 1
  const maxRounds = 30

  while (
    getAliveUnits(battlePlayerTeam).length > 0 &&
    getAliveUnits(battleEnemyTeam).length > 0 &&
    round <= maxRounds
  ) {
    const turnOrder = [...getAliveUnits(battlePlayerTeam), ...getAliveUnits(battleEnemyTeam)].sort(
      (a, b) => b.spd - a.spd
    )

    logs.push(`第 ${round} 回合开始。`)

    for (const actor of turnOrder) {
      if (!actor.alive) {
        continue
      }

      const enemyUnits = actor.side === 'player' ? battleEnemyTeam : battlePlayerTeam
      const target = pickTarget(enemyUnits)

      if (!target) {
        break
      }

      const damage = attackTarget(actor, target)
      logs.push(`${actor.name} 攻击 ${target.name}，造成 ${damage} 点伤害。`)

      if (!target.alive) {
        logs.push(`${target.name} 被击倒。`)
      }

      if (
        getAliveUnits(battlePlayerTeam).length === 0 ||
        getAliveUnits(battleEnemyTeam).length === 0
      ) {
        break
      }
    }

    round += 1
  }

  const playerAlive = getAliveUnits(battlePlayerTeam).length
  const enemyAlive = getAliveUnits(battleEnemyTeam).length

  let winner = 'draw'

  if (playerAlive > 0 && enemyAlive === 0) {
    winner = 'player'
  } else if (enemyAlive > 0 && playerAlive === 0) {
    winner = 'enemy'
  } else if (round > maxRounds) {
    winner = playerAlive >= enemyAlive ? 'player' : 'enemy'
    logs.push('战斗达到最大回合数，按存活优势判定胜负。')
  }

  return {
    winner,
    logs,
    playerTeam: battlePlayerTeam,
    enemyTeam: battleEnemyTeam,
    rounds: round - 1
  }
}
