// 作品集数据（双语）。板块 → 点击展开作品详情。
// 纯数据驱动：增删板块 / 作品只改本文件，Works.jsx 仅负责渲染。
//
// 板块字段：
//   id        唯一标识（用于 framer layoutId 共享元素动画）
//   no        编号 '01'…'02'
//   title     板块标题
//   tagline   索引行右侧一句话
//   items[]   扁平作品列表：{ name, meta?, tags?, link? }
//             点击 item 弹出全屏详情，可补充可选媒体/文案字段：
//             { image?, video?, year?, desc? }（缺省时媒体用占位、简介回退 meta/标签）
//   groups[]  分组作品（与 items 二选一）：{ heading, items: string[] }
//   awards[]  奖项 chip（可选）
//   footer    底部技术/备注一行（可选）

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  zh: {
    title: 'Works',
    closeLabel: '返回',
    openLabel: '展开作品',
    hint: '继续下滑',
    awardsLabel: '获奖',
    visitLabel: '访问作品',
    detailPlaceholder: '你的作品介绍',
    phImageLabel: '图片 / 视频',
    phButtonLabel: '跳转按钮',
    countLabel: (n) => `${n} 件作品`,
    sections: [
      {
        id: 'easyai',
        no: '01',
        title: 'EasyAI',
        tagline: 'AI 图像 · 面向全球',
        items: [
          {
            name: 'EasyAI Picture',
            meta: 'AI 图片生成网站',
            tags: ['Web', '海外市场'],
            link: 'https://easyai-picture.com/',
            slug: 'easyai-picture',
          },
          {
            name: 'EasyAI: AI Images',
            meta: 'iOS App · 已上架 App Store',
            tags: ['iOS', 'App Store'],
            slug: 'easyai-ios',
          },
        ],
        footer: '市场与竞品分析 · 产品规划 · UI/UX · 前后端开发 · AI 接入 · 定价商业化 · SEO 与增长',
      },
      {
        id: 'starift',
        no: '02',
        title: '星拾 Starift',
        tagline: '语音优先 · 本地优先',
        items: [
          {
            name: '星拾 · Starift',
            meta: '个人灵感捕捉 App · iOS',
            tags: ['iOS', '语音优先', '本地优先'],
            slug: 'starift',
          },
        ],
        footer: '录音转文字 · AI 总结 · 分类与状态跟踪 · 本地优先架构',
      },
    ],
  },
  en: {
    title: 'Works',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Awards',
    visitLabel: 'Visit site',
    detailPlaceholder: 'Your work description',
    phImageLabel: 'Image / Video',
    phButtonLabel: 'Link button',
    countLabel: (n) => `${n} works`,
    sections: [
      {
        id: 'easyai',
        no: '01',
        title: 'EasyAI',
        tagline: 'AI imaging · global',
        items: [
          {
            name: 'EasyAI Picture',
            meta: 'AI image generation website',
            tags: ['Web', 'Global'],
            link: 'https://easyai-picture.com/',
            slug: 'easyai-picture',
          },
          {
            name: 'EasyAI: AI Images',
            meta: 'iOS app · on the App Store',
            tags: ['iOS', 'App Store'],
            slug: 'easyai-ios',
          },
        ],
        footer: 'Market research · product planning · UI/UX · full-stack dev · AI integration · pricing · SEO & growth',
      },
      {
        id: 'starift',
        no: '02',
        title: '星拾 Starift',
        tagline: 'Voice-first · local-first',
        items: [
          {
            name: '星拾 · Starift',
            meta: 'Personal inspiration capture app · iOS',
            tags: ['iOS', 'Voice-first', 'Local-first'],
            slug: 'starift',
          },
        ],
        footer: 'Speech-to-text · AI summaries · categories & status tracking · local-first architecture',
      },
    ],
  },
}

// 板块配图（横向画廊每张卡片左侧的整高封面）。放到 public/works/covers/ 下。
// 缺图时左栏用大编号渐变占位，放入图片后自动点亮。
export const SECTION_COVERS: Record<string, string> = {
  easyai: `${import.meta.env.BASE_URL}works/covers/easyai.png`,
  starift: `${import.meta.env.BASE_URL}works/covers/starift.png`,
}

// 统计一个板块的作品数（items 或 groups 求和），用于索引行 hover 显示
export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}
