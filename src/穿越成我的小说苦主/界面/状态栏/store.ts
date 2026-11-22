import { defineMvuDataStore } from '@util/mvu';
import { Schema } from '../../schema';

export const useDataStore = defineMvuDataStore(Schema, { type: 'message', message_id: getCurrentMessageId() });

/** 十一名被洗脑目标，键名与 schema.ts 一致 */
export const TARGETS = [
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

export type TargetName = (typeof TARGETS)[number];

/** 八块板块的固定展示顺序 */
export const BLOCKS = ['检视人物', '人格调整', '女仆店营业', '淫能储存', '任务', '商城', '洗脑', '具现'] as const;
