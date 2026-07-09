import { SAVE_KEY, DEFAULT_SAVE_DATA } from '../utils/constants'

function cloneDefaultSave() {
  return JSON.parse(JSON.stringify(DEFAULT_SAVE_DATA))
}

export function createInitialSave() {
  return cloneDefaultSave()
}

export function loadSaveData() {
  const raw = localStorage.getItem(SAVE_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw)
    return parsed
  } catch (error) {
    console.error('读取存档失败：', error)
    return null
  }
}

export function saveGameData(data) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('保存存档失败：', error)
    return false
  }
}

export function removeSaveData() {
  localStorage.removeItem(SAVE_KEY)
}

export function exportSaveAsJson(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'black-white-summon-save.json'
  a.click()
  URL.revokeObjectURL(url)
}

export function exportSaveAsText(data) {
  return JSON.stringify(data)
}

export function importSaveFromText(text) {
  const parsed = JSON.parse(text)
  return parsed
}
