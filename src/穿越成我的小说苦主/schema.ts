// 穿越成我的小说苦主 —— MVU 变量结构（Zod 4）
// 事实来源：创作规划.yaml 的 mvu.structure 与 mvu.variables 两段
// 运行时已注入全局 z（Zod v4）与 _（lodash），本文件禁止任何 import 语句
// 数值范围：洗脑度 0~100、淫能 0~100、淫点 0~999、何浩.任务进度 0~100（越界用 _.clamp 静默收敛，不丢弃更新）

export const Schema = z.object({
  // ── 世界 ──
  世界: z
    .object({
      // 格式 YYYY/MM/DD
      日期: z.string().prefault('2024/09/01'),
      时间段: z.enum(['清晨', '上午', '中午', '下午', '傍晚', '夜里', '深夜']).prefault('清晨'),
      当前区域: z
        .enum(['李家住宅', '何浩家', '临江第一中学', '甜心女仆咖啡厅', '风俗街', '情侣宾馆', '李攀的出租房'])
        .prefault('李家住宅'),
      // 具体房间或位置，例如客厅、讲台、会员室
      当前场景: z.string().prefault('客厅'),
      剧情阶段: z.enum(['穿越第一日', '攻防取证', '老师物化', '系统易主', '经营占有', '终局']).prefault('穿越第一日'),
    })
    .prefault({}),

  // ── 主角（<user> 李攀，固定键名「主角」）──
  主角: z
    .object({
      身体状态: z.enum(['正常', '疲惫', '虚弱', '受伤']).prefault('正常'),
      // 修板块、改触发方式、提升洗脑度都用它；上限 100（淫能储存半损坏时只能存 30 属世界规则，不在结构里收紧）
      淫能: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 100))
        .prefault(0),
      // 系统任务奖励与商城兑换的计量，不参与修复
      淫点: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 999))
        .prefault(0),
      // 监控画面、录音、病毒权限、GPS、暗网委托这类筹码
      情报持有: z.record(z.string().describe('情报名'), z.enum(['已获取', '已失效'])).prefault({}),
      // 黑卡、喷雾余量、装置这类随身物
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
      持有者: z.enum(['何浩', '李攀']).prefault('何浩'),
      // 固定八块：任务、商城、洗脑、具现、检视人物、人格调整、女仆店营业、淫能储存
      // 键位用开放字符串而非 enum：AI 写错板块名时只丢那一条记忆，不至于整块 stat_data 校验失败
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
      // 正在修哪块、投进去多少，主人可以随时叫停
      修复队列: z.record(z.string().describe('板块名'), z.coerce.number()).prefault({}),
      // 初始只有淫乱母猪与口便器，随洗脑度与修复解锁其余模板
      已解锁模板: z.array(z.string()).prefault([]),
    })
    .prefault({}),

  // ── 何浩 ──
  何浩: z
    .object({
      // 渣土车之后置为 false，此后不再更新
      存活: z.boolean().prefault(true),
      // 他眼下在动谁，用于与玩家抢时间
      当前调教目标: z.string().prefault('无'),
      // 系统任务的完成度，满了他才敢真做
      任务进度: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 100))
        .prefault(0),
    })
    .prefault({}),

  // ── 十一名目标（结构完全一致；洗脑度 0~100，60 起第二人格、80 起第三阶段、100 为最终阶段）──
  方逸雅: z
    .object({
      洗脑度: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 100))
        .prefault(0),
      人格阶段: z.enum(['主人格', '第二人格', '最终阶段']).prefault('主人格'),
      当前人格: z.string().prefault('主人格'),
      称号: z.string().prefault('无'),
      // 游戏内到期时间（YYYY/MM/DD-HH:MM），或「长期挂载」「永久」
      人格维持: z.string().prefault('长期挂载'),
      显形态: z.enum(['潜伏', '显形']).prefault('潜伏'),
      今日功课: z.enum(['已完成', '超额']).prefault('已完成'),
      触发条件: z.record(z.string().describe('触发名'), z.enum(['已知', '未知'])).prefault({}),
    })
    .prefault({}),

  李望舒: z
    .object({
      洗脑度: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 100))
        .prefault(0),
      人格阶段: z.enum(['主人格', '第二人格', '最终阶段']).prefault('主人格'),
      当前人格: z.string().prefault('主人格'),
      称号: z.string().prefault('无'),
      人格维持: z.string().prefault('长期挂载'),
      显形态: z.enum(['潜伏', '显形']).prefault('潜伏'),
      今日功课: z.enum(['已完成', '超额']).prefault('已完成'),
      触发条件: z.record(z.string().describe('触发名'), z.enum(['已知', '未知'])).prefault({}),
    })
    .prefault({}),

  李可心: z
    .object({
      洗脑度: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 100))
        .prefault(0),
      人格阶段: z.enum(['主人格', '第二人格', '最终阶段']).prefault('主人格'),
      当前人格: z.string().prefault('主人格'),
      称号: z.string().prefault('无'),
      人格维持: z.string().prefault('长期挂载'),
      显形态: z.enum(['潜伏', '显形']).prefault('潜伏'),
      今日功课: z.enum(['已完成', '超额']).prefault('已完成'),
      触发条件: z.record(z.string().describe('触发名'), z.enum(['已知', '未知'])).prefault({}),
    })
    .prefault({}),

  李月怡: z
    .object({
      洗脑度: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 100))
        .prefault(0),
      人格阶段: z.enum(['主人格', '第二人格', '最终阶段']).prefault('主人格'),
      当前人格: z.string().prefault('主人格'),
      称号: z.string().prefault('无'),
      人格维持: z.string().prefault('长期挂载'),
      显形态: z.enum(['潜伏', '显形']).prefault('潜伏'),
      今日功课: z.enum(['已完成', '超额']).prefault('已完成'),
      触发条件: z.record(z.string().describe('触发名'), z.enum(['已知', '未知'])).prefault({}),
    })
    .prefault({}),

  欣雨墨: z
    .object({
      洗脑度: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 100))
        .prefault(0),
      人格阶段: z.enum(['主人格', '第二人格', '最终阶段']).prefault('主人格'),
      当前人格: z.string().prefault('主人格'),
      称号: z.string().prefault('无'),
      人格维持: z.string().prefault('长期挂载'),
      显形态: z.enum(['潜伏', '显形']).prefault('潜伏'),
      今日功课: z.enum(['已完成', '超额']).prefault('已完成'),
      触发条件: z.record(z.string().describe('触发名'), z.enum(['已知', '未知'])).prefault({}),
    })
    .prefault({}),

  阮馨香: z
    .object({
      洗脑度: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 100))
        .prefault(0),
      人格阶段: z.enum(['主人格', '第二人格', '最终阶段']).prefault('主人格'),
      当前人格: z.string().prefault('主人格'),
      称号: z.string().prefault('无'),
      人格维持: z.string().prefault('长期挂载'),
      显形态: z.enum(['潜伏', '显形']).prefault('潜伏'),
      今日功课: z.enum(['已完成', '超额']).prefault('已完成'),
      触发条件: z.record(z.string().describe('触发名'), z.enum(['已知', '未知'])).prefault({}),
    })
    .prefault({}),

  冷千雪: z
    .object({
      洗脑度: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 100))
        .prefault(0),
      人格阶段: z.enum(['主人格', '第二人格', '最终阶段']).prefault('主人格'),
      当前人格: z.string().prefault('主人格'),
      称号: z.string().prefault('无'),
      人格维持: z.string().prefault('长期挂载'),
      显形态: z.enum(['潜伏', '显形']).prefault('潜伏'),
      今日功课: z.enum(['已完成', '超额']).prefault('已完成'),
      触发条件: z.record(z.string().describe('触发名'), z.enum(['已知', '未知'])).prefault({}),
    })
    .prefault({}),

  欣芙倩: z
    .object({
      洗脑度: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 100))
        .prefault(0),
      人格阶段: z.enum(['主人格', '第二人格', '最终阶段']).prefault('主人格'),
      当前人格: z.string().prefault('主人格'),
      称号: z.string().prefault('无'),
      人格维持: z.string().prefault('长期挂载'),
      显形态: z.enum(['潜伏', '显形']).prefault('潜伏'),
      今日功课: z.enum(['已完成', '超额']).prefault('已完成'),
      触发条件: z.record(z.string().describe('触发名'), z.enum(['已知', '未知'])).prefault({}),
    })
    .prefault({}),

  李月瑶: z
    .object({
      洗脑度: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 100))
        .prefault(0),
      人格阶段: z.enum(['主人格', '第二人格', '最终阶段']).prefault('主人格'),
      当前人格: z.string().prefault('主人格'),
      称号: z.string().prefault('无'),
      人格维持: z.string().prefault('长期挂载'),
      显形态: z.enum(['潜伏', '显形']).prefault('潜伏'),
      今日功课: z.enum(['已完成', '超额']).prefault('已完成'),
      触发条件: z.record(z.string().describe('触发名'), z.enum(['已知', '未知'])).prefault({}),
    })
    .prefault({}),

  赵青青: z
    .object({
      洗脑度: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 100))
        .prefault(0),
      人格阶段: z.enum(['主人格', '第二人格', '最终阶段']).prefault('主人格'),
      当前人格: z.string().prefault('主人格'),
      称号: z.string().prefault('无'),
      人格维持: z.string().prefault('长期挂载'),
      显形态: z.enum(['潜伏', '显形']).prefault('潜伏'),
      今日功课: z.enum(['已完成', '超额']).prefault('已完成'),
      触发条件: z.record(z.string().describe('触发名'), z.enum(['已知', '未知'])).prefault({}),
    })
    .prefault({}),

  晴晴喵: z
    .object({
      洗脑度: z
        .coerce.number()
        .transform((v) => _.clamp(v, 0, 100))
        .prefault(0),
      人格阶段: z.enum(['主人格', '第二人格', '最终阶段']).prefault('主人格'),
      当前人格: z.string().prefault('主人格'),
      称号: z.string().prefault('无'),
      人格维持: z.string().prefault('长期挂载'),
      显形态: z.enum(['潜伏', '显形']).prefault('潜伏'),
      今日功课: z.enum(['已完成', '超额']).prefault('已完成'),
      触发条件: z.record(z.string().describe('触发名'), z.enum(['已知', '未知'])).prefault({}),
    })
    .prefault({}),
});

export type Schema = z.output<typeof Schema>;
