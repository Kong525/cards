import { defineMvuDataStore } from '@util/mvu';
import { Schema } from '../../schema';

export const useDataStore = defineMvuDataStore(Schema, { type: 'message', message_id: getCurrentMessageId() });

/** 十一名既有目标，键名与 schema.ts 一致 */
export const FIXED_TARGETS = [
  '方逸雅',
  '李望舒',
  '李可心',
  '李月怡',
  '欣雨墨',
  '阮馨香',
  '冷千雪',
  '欣芙倩',
  '李月瑶',
  '赵青青',
  '晴晴喵',
] as const;

/** 一名目标在界面上需要的字段 */
export interface CharacterState {
  洗脑度: number;
  人格阶段: string;
  当前人格: string;
  称号: string;
  人格维持: string;
  显形态: string;
  今日功课: string;
  在场: boolean;
  触发条件: Record<string, string>;
}

/** 从 stat_data 里取一名角色：既有角色直接取，其他角色走开放记录 */
export function get_character(data: unknown, name: string): CharacterState | undefined {
  const root = data as Record<string, unknown>;
  if ((FIXED_TARGETS as readonly string[]).includes(name)) {
    return root[name] as CharacterState | undefined;
  }
  const others = root.其他角色 as Record<string, CharacterState> | undefined;
  return others?.[name];
}

/** 全部角色名：既有十一名 + 开放记录里自动出现的所有新角色 */
export function list_characters(data: unknown): string[] {
  const root = data as Record<string, unknown>;
  const others = (root.其他角色 ?? {}) as Record<string, unknown>;
  return [...FIXED_TARGETS, ...Object.keys(others)];
}

/** 可选配色，均为暗色系 */
export const THEMES = {
  夜紫: {
    surface: '#171522',
    raised: '#1f1c2e',
    soft: '#262238',
    track: '#2b2743',
    text: '#e9e5f5',
    muted: '#9a93b4',
    border: '#37315a',
    primary: '#8b74e6',
    accent: '#c46a9c',
    system: '#5aa88a',
    warn: '#c9944a',
    danger: '#c65a5a',
  },
  夜蓝: {
    surface: '#111826',
    raised: '#1a2333',
    soft: '#212d42',
    track: '#243349',
    text: '#e2eaf7',
    muted: '#8fa0bb',
    border: '#2b3b58',
    primary: '#5b8ede',
    accent: '#7f6fd8',
    system: '#55a3a3',
    warn: '#c49a4f',
    danger: '#c25c66',
  },
  墨青: {
    surface: '#101a1a',
    raised: '#172525',
    soft: '#1d3030',
    track: '#223636',
    text: '#e0efee',
    muted: '#87a3a1',
    border: '#294242',
    primary: '#4f9d9d',
    accent: '#8f7cd6',
    system: '#6bb37f',
    warn: '#c2a04e',
    danger: '#c05c62',
  },
} as const;

export type ThemeName = keyof typeof THEMES;

/** 八块板块的修复消耗，数值来自创作规划的价值表 */
export const PLATE_COST: Record<string, number> = {
  淫能储存: 60,
  检视人物: 80,
  女仆店营业: 100,
  人格调整: 120,
  任务: 160,
  商城: 160,
  具现: 200,
  洗脑: 240,
};

/** 板块在面板里的固定顺序：先修得起的，再修不起的 */
export const PLATE_ORDER: string[] = ['检视人物', '人格调整', '女仆店营业', '淫能储存', '任务', '商城', '具现', '洗脑'];

/** 淫能上限：淫能储存完好才有 100，其余一律 30 */
export function energy_cap(plate_state: Record<string, string> | undefined): number {
  return plate_state?.淫能储存 === '完好' ? 100 : 30;
}

/** 板块状态到色号的映射，供面板上色 */
export const PLATE_TONE: Record<string, string> = {
  完好: 'ok',
  半损坏: 'warn',
  损坏: 'danger',
};

/** 把主题映射成 CSS 变量 */
export function theme_vars(name: ThemeName): Record<string, string> {
  const t = THEMES[name];
  return {
    '--c-surface': t.surface,
    '--c-surface-raised': t.raised,
    '--c-surface-soft': t.soft,
    '--c-track': t.track,
    '--c-text': t.text,
    '--c-text-muted': t.muted,
    '--c-border': t.border,
    '--c-primary': t.primary,
    '--c-accent': t.accent,
    '--c-system': t.system,
    '--c-warn': t.warn,
    '--c-danger': t.danger,
  };
}
