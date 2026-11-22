// 穿越成我的小说苦主 —— MVU 变量结构（Zod 4）
// 事实来源：创作规划.yaml 的 mvu.structure 与 mvu.variables 两段
// 运行时已注入全局 z（Zod v4）与 _（lodash），本文件禁止任何 import 语句
// 角色结构抽成 CharacterEntry 复用：十一名既有角色逐键声明，其他角色走开放记录，新角色自动进前端

/** 一名被洗脑目标的完整状态 */
const CharacterEntry = z.object({
  洗脑度: z
    .coerce.number()
    .transform(v => _.clamp(v, 0, 100))
    .prefault(0),
  人格阶段: z.enum(['主人格', '第二人格', '最终阶段']).prefault('主人格'),
  当前人格: z.string().prefault('主人格'),
  称号: z.string().prefault('无'),
  人格维持: z.string().prefault('未触发'),
  显形态: z.enum(['潜伏', '显形']).prefault('潜伏'),
  今日功课: z.enum(['已完成', '超额']).prefault('已完成'),
  在场: z.boolean().prefault(false),
  触发条件: z.record(z.string().describe('触发名'), z.enum(['已知', '未知'])).prefault({}),
});

export const Schema = z.object({
  // ── 世界 ──
  世界: z
    .object({
      // 格式 YYYY/MM/DD
      日期: z.string().prefault('2025/09/01'),
      时间段: z.enum(['清晨', '上午', '中午', '下午', '傍晚', '夜里', '深夜']).prefault('清晨'),
      当前区域: z
        .enum(['李家住宅', '何浩家', '临江第一中学', '甜心女仆咖啡厅', '风俗街', '情侣宾馆', '出租房'])
        .prefault('李家住宅'),
      当前场景: z.string().prefault('<user>的房间'),
      剧情阶段: z.enum(['穿越第一日', '攻防取证', '老师物化', '系统易主', '经营占有', '终局']).prefault('穿越第一日'),
    })
    .prefault({}),

  // ── 主角（<user>，固定键名「主角」）──
  主角: z
    .object({
      身体状态: z.enum(['正常', '疲惫', '虚弱', '受伤']).prefault('正常'),
      淫能: z
        .coerce.number()
        .transform(v => _.clamp(v, 0, 100))
        .prefault(0),
      淫点: z
        .coerce.number()
        .transform(v => _.clamp(v, 0, 999))
        .prefault(0),
      情报持有: z.record(z.string().describe('情报名'), z.enum(['已获取', '已失效'])).prefault({}),
      物品: z
        .record(
          z.string().describe('物品名'),
          z
            .object({
              数量: z.coerce.number().prefault(1),
              描述: z.string().prefault(''),
            })
            .prefault({}),
        )
        .prefault({}),
    })
    .prefault({}),

  // ── 系统（心海洗脑系统）──
  系统: z
    .object({
      持有者: z.enum(['何浩', '<user>', '李攀']).prefault('何浩'),
      板块完好度: z
        .record(z.string().describe('板块名'), z.enum(['完好', '半损坏', '损坏']))
        .prefault({
          任务: '损坏',
          商城: '损坏',
          洗脑: '损坏',
          具现: '损坏',
          检视人物: '完好',
          人格调整: '完好',
          女仆店营业: '完好',
          淫能储存: '半损坏',
        }),
      修复队列: z.record(z.string().describe('板块名'), z.coerce.number()).prefault({}),
      已解锁模板: z.array(z.string()).prefault([]),
    })
    .prefault({}),

  // ── 何浩 ──
  何浩: z
    .object({
      存活: z.boolean().prefault(true),
      当前调教目标: z.string().prefault('无'),
      任务进度: z
        .coerce.number()
        .transform(v => _.clamp(v, 0, 100))
        .prefault(0),
    })
    .prefault({}),

  // ── 十一名既有目标（结构同 CharacterEntry）──
  方逸雅: CharacterEntry.prefault({}),
  李望舒: CharacterEntry.prefault({}),
  李可心: CharacterEntry.prefault({}),
  李月怡: CharacterEntry.prefault({}),
  欣雨墨: CharacterEntry.prefault({}),
  阮馨香: CharacterEntry.prefault({}),
  冷千雪: CharacterEntry.prefault({}),
  欣芙倩: CharacterEntry.prefault({}),
  李月瑶: CharacterEntry.prefault({}),
  赵青青: CharacterEntry.prefault({}),
  晴晴喵: CharacterEntry.prefault({}),

  // ── 开放记录：以后出现的女性角色都写在这里，结构与上面完全一致，前端自动收录 ──
  其他角色: z.record(z.string().describe('角色名'), CharacterEntry).prefault({}),
});

export type Schema = z.output<typeof Schema>;
