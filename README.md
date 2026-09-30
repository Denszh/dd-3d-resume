<h1 align="center">About DD · 3D 个人简历</h1>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/code-MIT-blue.svg?style=flat" alt="License MIT"></a>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/three.js-r169-000000?style=flat&logo=three.js&logoColor=white" alt="three.js r169">
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite 5">
  <a href="https://about.senbuzy.com/"><img src="https://img.shields.io/badge/live-demo-brightgreen?style=flat" alt="Live Demo"></a>
</p>

<p align="center"><b>滚动就是运镜。把你的简历，长在一个 3D 场景里。</b></p>

<p align="center">
  <a href="https://about.senbuzy.com/">在线预览</a> |
  <a href="#快速开始">快速开始</a> |
  <a href="#改成你自己的">改成你自己的</a> |
  <a href="#换人物模型">换模型</a> |
  <a href="#教程">教程</a> |
  <a href="#部署">部署</a> |
  <a href="#源码-vs-零代码">源码 vs 零代码</a> |
  <a href="README.en.md">English</a>
</p>

<p align="center">
  <a href="https://about.senbuzy.com/"><img src="docs/preview.jpg" alt="3D 简历首屏：滚动驱动的人物模型 + 前景 About 文案" width="800"></a>
</p>

一个基于 **React Three Fiber + TypeScript** 的滚动式个人 3D 简历：一层固定的 3D 背景（会随滚动运镜的人物模型）+ 一层可滚动的 HTML 内容（About → 履历 → 作品集）。相机路径直接复用 glb 里烘好的动画，滚动条只是「刮」时间轴，再叠上自动对焦景深和眼球跟随光标。纯前端 SPA，`npm run build` 出来就是一个静态 `dist/`，扔哪都能跑。

> **开源说明（先读这段）**
> **代码**采用 **MIT** 许可证（见 [`LICENSE`](LICENSE)），欢迎学习、复用、二次开发。
> **个人内容与素材**（姓名 / 人物模型 / 简历 / 作品文案 / 品牌 logo / 社交链接）**不在 MIT 范围内**，版权归作者所有——fork 后请替换成你自己的，详见 [`NOTICE`](NOTICE)。

## 快速开始

### 不想写代码

试试 [intro3d.com](https://intro3d.com)：零代码的 3D 个人主页 DIY 平台，小白也能上手，制作与部署一站式解决。相比本项目少了「眼球跟随光标」的互动，其余相对完整。想快速拥有一个类似的 3D 简历，它更省时；两者的取舍见 [源码 vs 零代码](#源码-vs-零代码)。

即使走源码路线，intro3d 也能当成**可视化的 glb 导出器**用：不开 Blender，在浏览器里摆好模型和镜头，一键导出本项目需要的 `me.glb`，见 [intro3d 处理模型教程](tutor/intro3d处理模型教程/intro3d处理模型教程.md)。

### 本地跑起来

前端应用整个在 [`web/`](web) 下，**下文提到的代码 / 资源路径都相对 `web/`**（如 `src/App.tsx` 即 `web/src/App.tsx`），npm 命令也在 `web/` 里执行。

```bash
git clone https://github.com/Denszh/dd-3d-resume.git
cd dd-3d-resume/web
npm install
npm run dev        # 开发 http://localhost:5173
```

其余命令：

```bash
npm run build      # 类型检查 + 打包，产物输出到 dist/
npm run preview    # 预览 build 产物
npm run typecheck  # 仅类型检查（tsc -b）
npm run lint       # ESLint
```

**环境要求：** Node.js 20+（ESLint 10 需要）。无后端、无数据库、无需任何 API key。

## 你能做什么

- 一份会运镜的在线简历：滚动到哪一条履历，镜头就推到哪个锚点
- 人物模型换成你自己的（Blender 或 intro3d 导出 glb 即可）
- 作品集画廊 + markdown 撰写的作品详情页
- 眼球跟随光标、自动对焦景深、Bloom、胶片噪点等一整套氛围
- 免费上线：GitHub Pages / Cloudflare Pages / 任意静态托管
- 部署到任意子目录（`base: './'`，产物全相对路径）

## 改成你自己的

内容与表现是分离的，改内容基本只动数据文件：

| 想改什么 | 改哪里 |
| --- | --- |
| 首屏 About 文案 | `src/App.tsx` 里的 `COPY` |
| 履历（学历 / 经历 / 客户 / 社交链接） | `src/ui/Resume.tsx` |
| 作品集板块与作品列表 | `src/data/works.ts` |
| 单个作品的详情正文 | `src/content/works/<slug>.md`（frontmatter + markdown；格式见 `src/data/workDocs.ts`，示例见 `src/content/works/example.md`） |
| 履历条数 / 相机停靠点 | `src/data/focusPoints.ts` 的 `FOCUS_POINTS`（要与 `Resume.tsx` 的 entries 同步增删） |
| 灯光 / 景深 / Bloom / 背景渐变 / 人物位置 | `src/scene/Scene.tsx` 里各组件顶部的**普通常量**，直接改值，没有面板也没有额外配置文件 |
| 人物模型 | `public/models/me.glb`，见 [换人物模型](#换人物模型) |

作品详情用极简 markdown：每个作品一个 `.md`，通过 `works.ts` 里 item 的 `slug` 关联；没有对应 `.md` 的作品走统一占位详情。

## 素材与媒体

- **作品详情默认是占位。** 开源版本不含作者的作品详情与媒体：画廊保留各板块 / 作品**标题**，点开详情统一显示占位文案（改 `works.ts` 的 `detailPlaceholder / phImageLabel / phButtonLabel`）。想填充某个作品，写一个 `src/content/works/<slug>.md` 即可自动渲染成完整详情。
- **`public/works/` 默认不入 git**（体积大且属个人内容，见 `.gitignore`）——仅保留 4 张板块封面图 `public/works/covers/*.jpg`；其余媒体请自行放置或走 CDN，用 `/works/...` 绝对路径引用。
- `public/models/`、`public/images/`、`public/textures/`、`public/fonts/` 里的素材已入库。其中人物模型、品牌 logo、图片属于个人内容（见 [`NOTICE`](NOTICE)）；字体 / HDR 为第三方素材，复用前请各自核对许可。
- `scripts/compress-media.sh` 用 ffmpeg 原地压缩 `public` 下的图 / 视频（最大宽 1920，视频 H.264 ~2Mbps），仅当压得更小才覆盖。

## 换人物模型

想换成你自己的人物，替换 `public/models/me.glb`（源文件是仓库根的 [`blender/sen.blend`](blender)，在 Blender 里改完导出 glb 覆盖它），或改写 `src/scene/Scene.tsx` 用你自己的场景。代码按**对象名字**在 glb 里查找以下内容，缺哪个对应功能就失效：

| glb 里要有 | 作用 | 缺了会怎样 |
| --- | --- | --- |
| 相机 + 名为 `CameraAction` 的动画 clip | 滚动驱动的镜头路径；总帧数运行时按 24fps 从 clip 读，不写死 | 没有镜头运动，等于整个效果失效 |
| `focus-start`（或 `focus-0`） | 首屏对焦锚点（空对象），两种命名都认 | 首屏自动对焦失效 |
| 时间轴对焦锚点（每条履历一个空对象） | 顺序列在 `src/data/focusPoints.ts` 的 `FOCUS_POINTS`——`Scene.tsx` 与 `Resume.tsx` 共用的唯一真源。**条数是动态的** | 对应节点对不上焦 |
| `focus-works` | 作品区对焦锚点（空对象），可选 | 自动复用末时间轴锚点 |
| 名字含 `eye` 的网格 | 眼睛（眼球跟随光标） | 眼睛不动 |

## 工作原理

纯前端 SPA，无后端、无路由：`index.html` → `src/main.tsx` → `src/App.tsx`（一个固定 `<Canvas>` 3D 背景 + 可滚动 HTML 叠层）。

- **3D 背景**：`src/scene/Scene.tsx` 加载 `public/models/me.glb`，用 glb 自带的相机动画分 5 段被滚动「刮」着播放，再叠自动对焦景深与眼球跟随；灯光来自 `src/scene/Env.tsx`（`public/textures/env.hdr` 做 IBL）。
- **滚动内容**：`Hero`（About，在 `App.tsx` 内）→ `src/ui/Resume.tsx`（履历时间轴）→ `src/ui/Works.tsx`（作品集画廊 + 详情弹窗）。
- **叠层效果**：`LoadingScreen`（模型加载完前的遮罩）、`NoiseOverlay`（胶片噪点）、滚动渐暗 / 磨砂右轨 / 首屏装饰画框（都在 `App.tsx`）。
- **后期管线**：`<EffectComposer>` 里顺序为 DepthOfField → Bloom → SMAA，换效果时注意顺序会影响合成。
- **全局状态**：`src/store.ts`（zustand，轻量）。

镜头怎么跟履历对上，全靠 glb 里 `CameraAction` 的**帧约定**（24fps）：

```
第 0 帧                                                          最后一帧
  │        │        │        │        │        │                    │
focus-0  focus-1  focus-2  focus-3  focus-4  focus-5  ···  ···  focus-works
首屏     ├─ 50 帧 ─┤ 每个时间轴节点相隔 50 帧            尾段 = 作品区（长度任意）
```

```ts
// src/data/focusPoints.ts —— 履历条数 / 相机停靠点的唯一真源
export const FOCUS_POINTS = ['focus-1', 'focus-2', 'focus-3', 'focus-4', 'focus-5'] as const
export const FRAMES_PER_NODE = 50
```

增删履历时，只改 `FOCUS_POINTS` + `Resume.tsx` 的 entries，节点数与帧区间都会自动推导。

## 仓库结构

| 目录 | 内容 |
| --- | --- |
| [`web/`](web) | 前端应用（React Three Fiber + TypeScript），所有代码约定都在这里 |
| [`blender/`](blender) | 场景三维源文件 `sen.blend`（人物 + 相机动画 + 对焦锚点），导出前编辑的源头 |
| [`tutor/`](tutor) | 面向使用者的改造教程（部署、贴纸、眼球、intro3d 导模型） |
| [`docs/`](docs) | README 用到的预览图 |
| [`CLAUDE.md`](CLAUDE.md) [`AGENTS.md`](AGENTS.md) | 面向 AI 编码助手的协作约定 |
| [`LICENSE`](LICENSE) [`NOTICE`](NOTICE) | 许可与内容声明 |

`web/` 内部：

```
web/
  src/
    App.tsx              Canvas + 滚动内容装配、首屏 About、加载/叠层
    main.tsx             入口
    store.ts             全局交互状态（zustand）
    data/
      works.ts           作品集板块 / 作品列表（作品集数据源）
      workDocs.ts        构建期内联 content/works/*.md + frontmatter 解析
      focusPoints.ts     时间轴对焦锚点名单（履历条数的唯一真源）
    content/works/       作品详情 markdown；含 example.md 模板
    scene/
      Scene.tsx          3D 场景：me.glb 人物 + glb 相机动画 + 滚动驱动 / 眼球跟随
      Env.tsx            env.hdr 环境光照（IBL）
    ui/
      Resume.tsx         履历时间轴（含个人数据）
      Works.tsx          作品集画廊 + 详情弹窗
      LoadingScreen.tsx / NoiseOverlay.tsx / SocialIcons.tsx / ZooopLogo.tsx
  public/
    models/  fonts/  images/  textures/   静态素材
  scripts/compress-media.sh                媒体压缩脚本（ffmpeg，原地压缩）
```

## 教程

写给使用者（不一定会写代码）的分步教程，都在 [`tutor/`](tutor)：

| 教程 | 讲什么 |
| --- | --- |
| [① 部署到 GitHub Pages](tutor/部署教程/1-部署到-GitHub-Pages.md) | 免费上线成 `你的用户名.github.io/sen-3d-resume/`，全程点鼠标 |
| [② 部署到 Cloudflare Pages](tutor/部署教程/2-部署到-Cloudflare-Pages.md) | 私有仓库也免费、全球 CDN、绑自定义域名更省心 |
| [用 intro3d 处理模型](tutor/intro3d处理模型教程/intro3d处理模型教程.md) | 不开 Blender，在浏览器里摆好模型和镜头导出 `me.glb`（含 B 站视频） |
| [眼球跟随](tutor/眼球教程/眼球教程.md) | 「眼睛追着鼠标看」是怎么做的，换模型后怎么接上（含 B 站视频） |
| [AI 贴纸包](tutor/贴纸教程/贴纸教程.md) | 让 AI 批量生成透明背景贴纸，贴到脸上 / 场景 / 网页里 |

## 部署

```bash
cd web
npm run build    # → dist/
```

`vite.config.ts` 里 `base: './'`，产物用相对路径，`dist/` 可直接双击打开，也可放到任意子目录（如 `example.com/portfolio/`）。运行时 public 资源用 `import.meta.env.BASE_URL` 拼接。部署就是把 `dist/` 传到任意静态托管（GitHub Pages / Cloudflare Pages / Netlify / Vercel / 对象存储 / 自有服务器）。仓库自带 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)，推到 `main` 就能自动发布到 GitHub Pages。

## 源码 vs 零代码

本项目和 [intro3d.com](https://intro3d.com) 做的是同一件事的两端。真要快速上线，先用 intro3d；想完全掌控、深度定制，再用这份源码（两者也能配合：用 intro3d 导 glb，再回到源码里改）。

|  | **本项目（源码）** | **intro3d（零代码）** |
| --- | --- | --- |
| 上手成本 | 要会一点前端 / 命令行 | 浏览器里点，小白可上手 |
| 定制自由度 | 全部——场景、后期、交互、结构随便改 | 平台提供的能力范围内 |
| 眼球跟随光标 | ✅ | ❌ |
| 3D 模型 | 自己在 Blender 做或 intro3d 导出 | 平台内可视化处理 |
| 部署 | 自己传 `dist/` 到任意静态托管 | 一站式托管 |
| 许可 | 代码 MIT（个人内容除外，见 `NOTICE`） | 平台服务条款 |

## 为什么用它

- **滚动即运镜**：相机路径是 glb 里烘好的动画，滚动条只负责在时间轴上「刮」，比手写相机插值好调也好换。
- **数据驱动**：改内容只动数据文件（`Resume.tsx` / `works.ts` / `*.md` / `COPY`），不用碰 3D 代码。
- **动态节点数**：履历条数不写死，`FOCUS_POINTS` 加一条，节点与帧区间自动适配。
- **参数都是常量**：所有可调项就是组件顶部的普通常量，没有隐藏配置层。
- **纯静态**：无后端、无路由、无 API key，`dist/` 传到任何地方都能跑，还能塞进子目录。
- **对 AI 助手友好**：[`CLAUDE.md`](CLAUDE.md) / [`AGENTS.md`](AGENTS.md) 已写好协作约定，交给 Claude Code / Cursor 改也不会跑偏。

## 技术栈

React 18 · TypeScript · @react-three/fiber · @react-three/drei · @react-three/postprocessing · three · framer-motion · zustand · Vite

## 许可与版权

- **代码**：[MIT](LICENSE)。
- **个人内容与素材**：© DD，保留所有权利，**不在 MIT 范围内**，详见 [`NOTICE`](NOTICE)。fork 后请替换成你自己的姓名、模型、简历、作品与 logo。
- **第三方素材**（字体 / HDR）：请各自核对其原始许可后再分发。
