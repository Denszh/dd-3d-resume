import { motion } from 'framer-motion'
import { ZooopLogo } from './ZooopLogo'
import { SOCIAL_ICONS } from './SocialIcons'
import { FOCUS_POINTS } from '../data/focusPoints'

// 履历数据（双语）。英文为译稿，可按需润色。
interface ResumeGroup {
  heading?: string
  logo?: string
  logoImg?: string
  sub?: string
  link?: string
  items?: string[]
  links?: { id: string; label: string; href: string }[]
}
interface ResumeEntry {
  period: string
  place: string
  role?: string
  logo?: { src: string; alt: string }
  points?: string[]
  groups?: ResumeGroup[]
}
const RESUME: Record<'en' | 'zh', { title: string; entries: ResumeEntry[] }> = {
  en: {
    title: 'Résumé',
    entries: [
      {
        period: '2018 – 2020',
        place: 'Military Service',
        role: 'Signal Operator / Computer Operator',
        points: [
          'First touch of tech: computers & networks, self-taught Python / C++',
          'Discipline, execution and responsibility forged in service',
        ],
      },
      {
        period: '2022 – 2023',
        place: 'Mingchuang Studio · Campus',
        role: 'Founder / Lead',
        points: [
          'Built & led an 8-person dev team from 0 to 1',
          'Designed the architecture & core backend of the campus research system',
          'First full cycle: requirements → teamwork → development → delivery',
        ],
      },
      {
        period: '2023 – 2024',
        place: 'Java Backend Development',
        role: 'Java Backend Developer',
        points: [
          'Requirements analysis, technical design & delivery — responsible for backend business logic, APIs and database design',
          'Shifted from “completing dev tasks” to understanding product, business and system architecture',
        ],
      },
      {
        period: '2024 – Now',
        place: 'Full-stack / AI Products',
        role: 'Full-stack Developer',
        points: [
          'Front & back end, BI analytics, AI productization in real business',
          'Solo or core builder of multiple AI products, end to end',
          'AI products generated 2M+ RMB in revenue so far',
        ],
      },
      {
        period: '2025.12 – Now',
        place: 'Indie Developer / AI Native Builder',
        groups: [
          {
            heading: 'EasyAI Picture',
            sub: 'AI image generation website',
            link: 'https://easyai-picture.com/',
          },
          {
            heading: 'EasyAI: AI Images',
            sub: 'iOS app, live on the App Store',
          },
          {
            heading: '星拾 · Starift',
            sub: 'Voice-first inspiration capture app',
          },
          {
            heading: 'Solo = a whole team',
            sub: 'market · design · code · launch · pricing · growth',
          },
        ],
      },
    ],
  },
  zh: {
    title: 'Résumé',
    entries: [
      {
        period: '2018 – 2020',
        place: '军旅生涯',
        role: '通信兵 / 计算机操作员',
        points: [
          '技术起点：系统接触计算机与网络，业余自学 Python / C++',
          '军旅淬炼出的执行力、自律性与责任意识',
        ],
      },
      {
        period: '2022 – 2023',
        place: '铭创工作室 · 校级项目',
        role: '创始人 / 负责人',
        points: [
          '从 0 到 1 组建并带领 8 人开发团队',
          '主导科研管理系统架构与核心后端开发',
          '第一次完整走通需求 → 协作 → 开发 → 交付',
        ],
      },
      {
        period: '2023 – 2024',
        place: 'Java 后端开发',
        role: 'Java 后端开发',
        points: [
          '参与需求分析、技术方案设计与功能落地，负责后端业务逻辑、接口及数据库设计',
          '开始从“完成开发任务”转向理解产品、业务与系统整体架构',
        ],
      },
      {
        period: '2024 – 至今',
        place: '全栈 / AI 产品',
        role: '全栈开发工程师',
        points: [
          '前后端 + BI 数据分析 + AI 能力产品化落地',
          '独立或核心参与多个 AI 产品全栈开发',
          '参与建设的 AI 产品累计营收 200W+',
        ],
      },
      {
        period: '2025.12 – 至今',
        place: '独立开发 / AI Native Builder',
        groups: [
          {
            heading: 'EasyAI Picture',
            sub: 'AI 图片生成网站',
            logoImg: `${import.meta.env.BASE_URL}images/easyai-logo.png`,
            link: 'https://easyai-picture.com/',
          },
          {
            heading: 'EasyAI: AI Images',
            sub: 'iOS App · 已上架 App Store',
            logoImg: `${import.meta.env.BASE_URL}images/easyai-app.png`,
          },
          {
            heading: '星拾 · Starift',
            sub: '语音优先的个人灵感捕捉 App',
            logoImg: `${import.meta.env.BASE_URL}images/starift-logo.png`,
          },
          {
            heading: '一个人 = 一支团队',
            sub: '市场 · 设计 · 开发 · 上线 · 定价 · 增长',
          },
        ],
      },
    ],
  },
}

// 履历条目依次对应 glb 里的聚焦锚点（相机停靠点），顺序须与 entries 一致。
// 名单是唯一真源，见 data/focusPoints.ts（Scene.tsx 也从那里取）。
const POINT_ORDER = FOCUS_POINTS

const EASE = [0.22, 1, 0.36, 1]
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Group({ group }: { group: ResumeGroup }) {
  const heading =
    group.logo === 'zooop' ? (
      <a
        className="zooop-logo-link"
        href={group.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ZOOOP"
      >
        <ZooopLogo className="zooop-logo" animated />
      </a>
    ) : group.link ? (
      <a className="about-link" href={group.link} target="_blank" rel="noopener noreferrer">
        {group.heading}
      </a>
    ) : (
      <span>{group.heading}</span>
    )

  return (
    <motion.div className="tl-group" variants={itemV}>
      <div className="tl-group-head">
        {group.logoImg && (
          <span className="tl-group-logo">
            <img src={group.logoImg} alt={group.heading || ''} loading="lazy" />
          </span>
        )}
        {heading}
        {group.sub && <span className="tl-group-sub">{group.sub}</span>}
      </div>
      {group.items && (
        <ul className="tl-points">
          {group.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
      {group.links && (
        <div className="tl-logos">
          {group.links.map((l) => {
            const Icon = SOCIAL_ICONS[l.id as keyof typeof SOCIAL_ICONS]
            return (
              <a
                key={l.id}
                className="tl-logo"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
              >
                <Icon />
              </a>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div
      className="tl-entry"
      data-point={POINT_ORDER[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      {/* tl-body 包住文字内容（点保持在外做时间轴标记）：移动端可给它加卡片衬底，
          且它紧贴内容高度，不含 tl-entry 用于排布的大 padding。
          用普通 div（非 motion）：framer 变体经 React context 穿透它，叶子元素仍是
          tl-entry 的直接 stagger 子级，入场动画与包裹前完全一致。 */}
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>
          {entry.period}
        </motion.div>
        <motion.div className="tl-head" variants={itemV}>
          {entry.logo && (
            <span className="tl-logo-chip">
              <img src={entry.logo.src} alt={entry.logo.alt} loading="lazy" />
            </span>
          )}
          <h3 className="tl-place">{entry.place}</h3>
        </motion.div>
        {entry.role && (
          <motion.div className="tl-role" variants={itemV}>
            {entry.role}
          </motion.div>
        )}
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </motion.ul>
        )}
        {entry.groups && entry.groups.map((g, i) => <Group key={i} group={g} />)}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  const data = RESUME[lang]
  return (
    <section className="resume" lang={lang}>
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {data.title}
      </motion.h2>
      <div className="timeline">
        {data.entries.map((e, i) => (
          <Entry key={i} entry={e} index={i} />
        ))}
      </div>
    </section>
  )
}
