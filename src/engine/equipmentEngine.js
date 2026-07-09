function randomPick(list) {
  const index = Math.floor(Math.random() * list.length)
  return list[index]
}

export function createEquipmentInstance(template) {
  return {
    uid: `equip_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    templateId: template.id,
    name: template.name,
    slot: template.slot,
    set: template.set,
    rarity: template.rarity,
    mainStat: template.mainStat,
    equippedBy: null
  }
}

export function rollBattleEquipments(equipmentTemplates, count = 1) {
  const drops = []

  for (let i = 0; i < count; i += 1) {
    const template = randomPick(equipmentTemplates)
    drops.push(createEquipmentInstance(template))
  }

  return drops
}

export function getCharacterEquipments(allEquipments, characterId) {
  return allEquipments.filter((equipment) => equipment.equippedBy === characterId)
}

export function calculateEquipmentStats(allEquipments, characterId) {
  const equipped = getCharacterEquipments(allEquipments, characterId)

  const bonus = {
    hp: 0,
    atk: 0,
    def: 0,
    spd: 0,
    crit: 0,
    critDmg: 0
  }

  const setCounter = {}

  equipped.forEach((equipment) => {
    const statType = equipment.mainStat?.type
    const statValue = equipment.mainStat?.value || 0

    if (bonus[statType] !== undefined) {
      bonus[statType] += statValue
    }

    if (!setCounter[equipment.set]) {
      setCounter[equipment.set] = 0
    }

    setCounter[equipment.set] += 1
  })

  Object.entries(setCounter).forEach(([setName, count]) => {
    if (count >= 2) {
      if (setName === 'attack') {
        bonus.atk += 20
      }

      if (setName === 'guard') {
        bonus.def += 20
      }

      if (setName === 'speed') {
        bonus.spd += 10
      }

      if (setName === 'crit') {
        bonus.crit += 8
      }
    }
  })

  return {
    equipped,
    bonus,
    setCounter
  }
}
