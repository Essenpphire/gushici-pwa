# gushici-pwa
高中时的黑历史，一个手机端的古诗词阅读 PWA。

## 预览图
![prev](./doc/preview.jpg)

## 技术栈

### 框架
- **React 18** — UI
    - 用 `react-app-rewired` 修改了引用路径，参见 `config-overrides.js`
    - 用 `esbuild` 代替 CRA 默认编译，数秒内即可完成编译
- **Redux Toolkit** + **react-redux** — 状态管理
- **redux-persist** — 数据持久化（用户设置与收藏）

### UI
- **MUI (Material-UI) v5** — 组件库（`@mui/material` + `@mui/icons-material`）
- **notistack** — 全局消息提示（其实未实装）
- **react-swipeable-views** — 移动端滑动视图

### 网络请求
- **axios** — HTTP 请求封装（见 `src/axios/`、`src/api/`）


## 项目结构

```
src/
├── api/          # 接口请求层
├── axios/        # axios 实例与拦截器
├── components/   # 通用组件（卡片、诗词详情页、底部导航栏、加载文字等）
├── pages/        # 页面（诗词、古文、收藏、设置）
├── store/        # Redux 储存数据
├── styles/       # 全局样式
├── index.js      # 应用入口
├── service-worker.js
└── serviceWorkerRegistration.js
```

## 如何部署

### 环境要求
- Node.js ≥ 16（推荐 LTS）
- yarn

### 安装
```bash
yarn install
```

### 开发模式
```bash
yarn start
```
启动 `react-app-rewired` 开发服务器，默认监听 `http://localhost:3000`。

> 注意： `serviceWorkerRegistration.unregister()` 默认不注册 SW，避免缓存旧版本干扰

### 构建
```bash
yarn build # 等价于 node build.js
```
图方便直接打开 `build.bat` 也行。

### 预览
```bash
yarn preview
```
使用 `serve` 托管 `./build` 目录并打开 `http://localhost:3000`。

### 部署
将 `build/` 目录整体上传至任意静态站点托管（Nginx / Vercel / Netlify / GitHub Pages / 对象存储 + CDN 均可）。

要让 PWA 离线缓存生效，需满足：
1. 站点通过 **HTTPS** 提供（`localhost` 例外）；
2. `src/index.js` 中将 `serviceWorkerRegistration.unregister()` 改为 `register()`；
3. 确保 `manifest.json`、`service-worker.js` 等资源随 `build/` 一起发布。