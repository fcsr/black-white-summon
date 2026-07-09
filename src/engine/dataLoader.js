async function loadJson(path, errorMessage) {
  const response = await fetch(path)

  if (!response.ok) {
    throw new Error(errorMessage)
  }

  return await response.json()
}

export async function loadCharacters() {
  return await loadJson('./data/characters.json', '角色数据加载失败')
}

export async function loadSummonPools() {
  return await loadJson('./data/summonPools.json', '卡池数据加载失败')
}

export async function loadStages() {
  return await loadJson('./data/stages.json', '关卡数据加载失败')
}
