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
