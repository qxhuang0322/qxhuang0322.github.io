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
| 公开版简历 | `assets/Qingxiao_Huang_CV.pdf` |
| 排版和交互 | `styles.css`、`script.js` |

`featured: true` 表示论文展示在首页；`status` 使用 `published`、`accepted` 或 `preprint`。`sourceUrls` 用于保存来源，不会显示在网页上。不要用虚构链接或 `#` 代替论文链接。

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

`assets/Qingxiao_Huang_CV.pdf` 独立维护，更新论文或教育经历后也需要同步更新。`docs/source-notes.md` 记录本次资料核实依据。

## 发布说明

`.github/workflows/pages.yml` 只发布 `_site` 中的公开网页、图片与公开版简历。原始资料、工作笔记和构建脚本不进入 Pages 产物。构建无需安装 npm 依赖，也不需要额外的密钥。

## 致谢

网站最初 fork 自 [AcaNova-X](https://github.com/yihangtao/AcaNova-X)，视觉结构参考 [Yu Guo](https://gy65896.github.io/)。保留原模板作者署名；个人资料、论文内容和配图均已替换。
