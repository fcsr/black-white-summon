function randomPickByRate(rarityRates) {
  const random = Math.random()
  let cumulative = 0

  for (const [rarity, rate] of Object.entries(rarityRates)) {
    cumulative += rate
    if (random <= cumulative) {
      return rarity
    }
  }

  return 'normal'
}

function getCandidateListByRarity(characters, rarity) {
  return characters.filter((character) => character.rarity === rarity)
}

function randomPickCharacter(characters) {
  const index = Math.floor(Math.random() * characters.length)
  return characters[index]
}

function buildOwnedCharacter(template) {
  const levelMap = {
    normal: 1,
    rare: 1,
    elite: 1,
    epic: 1,
    legend: 1,
    myth: 1
  }

  return {
    id: template.id,
    name: template.name,
    rarity: template.rarity,
    level: levelMap[template.rarity] || 1,
    faction: template.faction,
    role: template.role,
    position: template.position,
    description: template.description || ''
  }
}

export function performSummon({
  drawCount,
  roster,
  summonState,
  poolConfig,
  characterTemplates
}) {
  const results = []

  let pityEpic = summonState.pityEpic
  let pityLegend = summonState.pityLegend

  for (let i = 0; i < drawCount; i += 1) {
    pityEpic += 1
    pityLegend += 1

    let targetRarity = null

    if (pityLegend >= poolConfig.pity.legend) {
      targetRarity = 'legend'
    } else if (pityEpic >= poolConfig.pity.epic) {
      targetRarity = 'epic'
    } else {
      targetRarity = randomPickByRate(poolConfig.rarityRates)
    }

    if (targetRarity === 'legend') {
      pityLegend = 0
      pityEpic = 0
    } else if (targetRarity === 'epic') {
      pityEpic = 0
    }

    const candidates = getCandidateListByRarity(characterTemplates, targetRarity)
    const pickedTemplate = randomPickCharacter(candidates)
    const alreadyOwned = roster.some((character) => character.id === pickedTemplate.id)

    results.push({
      template: pickedTemplate,
      ownedCharacter: buildOwnedCharacter(pickedTemplate),
      isDuplicate: alreadyOwned
    })
  }

  return {
    results,
    pityEpic,
    pityLegend
  }
}
