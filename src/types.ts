export type TabView = 'access' | 'dashboard' | 'world' | 'players' | 'addons' | 'mascot';

export type MascotType = 'creeper' | 'enderman' | 'warden' | 'steve' | 'axolotl';

export interface Player {
  id: string;
  name: string;
  xuid: string;
  role: 'LVL 4 OP' | 'LVL 2 OP' | 'MEMBER' | 'VISITOR';
  ping: number;
  device: 'Windows 11' | 'Xbox Series X' | 'PlayStation 5' | 'Nintendo Switch' | 'Android' | 'iOS';
  status: 'online' | 'afk' | 'whitelisted' | 'banned';
  dimension: 'Overworld' | 'Nether Core' | 'The End';
  coordinates: { x: number; y: number; z: number };
  joinedAt: string;
  avatarSeed: string;
}

export interface ConsoleLogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'CMD' | 'SUCCESS';
  message: string;
}

export interface ServerState {
  status: 'ONLINE' | 'RESTARTING' | 'OFFLINE';
  version: string;
  port: number;
  protocol: number;
  tps: number;
  uptimeSeconds: number;
  cpuPercent: number;
  ramUsedMB: number;
  ramTotalMB: number;
  onlineCount: number;
  maxPlayers: number;
  difficulty: 'Peaceful' | 'Easy' | 'Normal' | 'Hard';
  gameMode: 'Survival' | 'Creative' | 'Adventure';
  whitelistEnabled: boolean;
  pvpEnabled: boolean;
  allowCheats: boolean;
  activeDimensionCount: number;
}

export interface AddonModule {
  id: string;
  title: string;
  author: string;
  version: string;
  category: 'Behavior Pack' | 'Resource Pack' | 'Ray Tracing / RTX' | 'Gameplay Expansion';
  description: string;
  badge: string;
  enabled: boolean;
  size: string;
  downloads: string;
  iconBg: string;
  iconEmoji: string;
  imageUrl?: string;
}

export interface DimensionConfig {
  id: string;
  name: string;
  themeColor: string;
  accentColor: string;
  seed: string;
  chunksLoaded: number;
  activeEntities: number;
  ambientLight: string;
  description: string;
}
