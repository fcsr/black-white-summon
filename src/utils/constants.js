export const SAVE_KEY = 'black_white_summon_save'

export const GAME_VERSION = '0.0.3'

export const DEFAULT_PLAYER = {
  name: '记录者',
  gold: 1000,
  gem: 300,
  energy: 100
}

export const DEFAULT_PROGRESS = {
  currentChapter: 1,
  clearedStages: ['stage_1_1', 'stage_1_2', 'stage_1_3']
}

export const DEFAULT_TEAM = [
  {
    id: 'char_001',
    name: '失光审判官',
    rarity: 'legend',
    level: 60,
    faction: '白塔议会',
    role: '术士',
    position: '后排',
    description: '白塔议会中负责清理禁忌记录的审判者。'
  },
  {
    id: 'char_002',
    name: '夜祷祭司',
    rarity: 'epic',
    level: 52,
    faction: '无名教团',
    role: '祭司',
    position: '后排',
    description: '以静默祷言维系队伍生机的神秘祭司。'
  },
  {
    id: 'char_003',
    name: '灰烬持盾者',
    rarity: 'elite',
    level: 45,
    faction: '灰烬远征军',
    role: '守卫',
    position: '前排',
    description: '常年立于最前方，以盾与余烬守住阵线。'
  },
  {
    id: 'char_004',
    name: '荒原猎手',
    rarity: 'rare',
    level: 38,
    faction: '边境流亡者',
    role: '射手',
    position: '后排',
    description: '善于追踪与远距狙杀的边境幸存者。'
  },
  {
    id: 'char_005',
    name: '见习卫兵',
    rarity: 'normal',
    level: 24,
    faction: '边境流亡者',
    role: '守卫',
    position: '前排',
    description: '尚未经历真正大战的新兵，但仍然回应了召唤。'
  }
]

export const DEFAULT_SETTINGS = {
  autoSave: true,
  textSpeed: 1
}

export const DEFAULT_SAVE_DATA = {
  version: GAME_VERSION,
  player: DEFAULT_PLAYER,
  progress: DEFAULT_PROGRESS,
  roster: {
    ownedCharacters: DEFAULT_TEAM,
    currentTeam: DEFAULT_TEAM.map((item) => item.id)
  },
  inventory: {
    items: [],
    equipments: []
  },
  summon: {
    pityEpic: 7,
    pityLegend: 31,
    tickets: 12,
    logs: [
      '你翻开书页，召来了 [稀有] 荒原猎手',
      '书页间浮现古老誓词：[史诗] 夜祷祭司',
      '封印震颤，钟声响起：[传说] 失光审判官'
    ]
  },
  settings: DEFAULT_SETTINGS
}

export const RARITY_LABELS = {
  normal: '普通',
  rare: '稀有',
  elite: '卓越',
  epic: '史诗',
  legend: '传说',
  myth: '神话'
}

export const RARITY_CLASS_MAP = {
  normal: 'rarity-normal',
  rare: 'rarity-rare',
  elite: 'rarity-elite',
  epic: 'rarity-epic',
  legend: 'rarity-legend',
  myth: 'rarity-myth'
}
