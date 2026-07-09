export async function loadCharacters() {
  const response = await fetch('./data/characters.json')
  if (!response.ok) {
    throw new Error('角色数据加载失败')
  }
  return await response.json()
}

export async function loadSummonPools() {
  const response = await fetch('./data/summonPools.json')
  if (!response.ok) {
    throw new Error('卡池数据加载失败')
  }
  return await response.json()
}
