# Qingxiao Huang · 黄青霄

个人学术主页：[qxhuang0322.github.io](https://qxhuang0322.github.io/)。

页面参考 [Yu Guo 的主页](https://gy65896.github.io/) 与 [AcaNova-X](https://github.com/yihangtao/AcaNova-X)，保留双栏学术主页结构，改为本地样式和静态 HTML。网页无需加载 Tailwind、字体或图标 CDN；关闭 JavaScript 时仍能阅读全部内容。

## 更新内容

| 内容 | 文件 |
|---|---|
| 姓名、简介、研究方向、教育、服务、链接 | `data/profile.json` |
| 论文及 DOI / arXiv 链接 | `data/publications.json` |
| 新闻动态 | `data/news.json` |
| 获奖信息 | `data/honors.json` |
| 头像 | `assets/profile.jpg` |
| 论文原图 | `assets/publications/` |
| 学校标识 | `assets/schools/` |
| 排版和交互 | `styles.css`、`script.js` |

首页与完整论文列表均只展示 `isFirstAuthor: true` 的论文；其中 `featured: true` 表示论文展示在首页。`status` 使用 `published`、`accepted` 或 `preprint`。`sourceUrls` 用于保存来源，不会显示在网页上。不要用虚构链接或 `#` 代替论文链接。

论文图片使用原文中的图，点击可查看大图。将图片放到 `assets/publications/`，在论文记录中设置 `thumbnail`（相对网站根目录的图片路径）、`thumbnailAlt`（图片描述）、`figureLabel`（如 `Fig. 1`）和 `figureSource`（原文链接）。没有原图时不显示配图。

`journalImpactFactor` 保存期刊的 WoS/JCR 影响因子：`value` 是数值、`year` 是指标年份、`sourceUrl` 是官方来源。显示最新核实的期刊指标，不将论文发表年与指标年份混用；arXiv 预印本不显示影响因子。

教育经历使用 `logo` 指向学校标识；助教卡片支持 `institution`、`logo` 和 `items`。更换头像后，构建脚本会自动生成图片版本号，避免浏览器继续显示旧图。Contact 区包含城大校址地图及外部大地图链接。

修改 JSON 后推送到 `main`，GitHub Actions 会重新生成页面、检查链接并发布。也可以直接在 GitHub 网页修改这些数据文件。首次发布需在 Settings → Pages → Source 选择 **GitHub Actions**。

## 本地编辑与预览

安装 Node.js（22 或更新版本）后，在此文件夹运行：

```powershell
node scripts/build.mjs
node scripts/check.mjs
python -m http.server 8765 --bind 127.0.0.1
```

浏览器访问 `http://127.0.0.1:8765/`，修改后重新生成并刷新。`index.html` 和 `pages/*.html` 是生成文件；应优先编辑 `data/*.json` 或 `scripts/build.mjs`。

```powershell
git add .
git commit -m "Update academic homepage"
git push origin main
```

首页已移除 CV 链接；现有 `assets/Qingxiao_Huang_CV.pdf` 文件保留。`docs/source-notes.md` 记录资料与论文图片的来源。

## 发布说明

`.github/workflows/pages.yml` 只发布 `_site` 中的公开网页、图片与公开版简历。原始资料、工作笔记和构建脚本不进入 Pages 产物。构建无需安装 npm 依赖，也不需要额外的密钥。

## 致谢

网站最初 fork 自 [AcaNova-X](https://github.com/yihangtao/AcaNova-X)，视觉结构参考 [Yu Guo](https://gy65896.github.io/)。保留原模板作者署名；个人资料、论文内容和配图均已替换。
