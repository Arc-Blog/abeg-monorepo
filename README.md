# Arc rainbow blog

[![License: MIT](https://camo.githubusercontent.com/fd551ba4b042d89480347a0e74e31af63b356b2cac1116c7b80038f41b04a581/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d677265656e2e737667)](https://opensource.org/licenses/MIT) [![](https://img.shields.io/badge/pnpm->=8.9.2-#f69220.svg)](https://pnpm.io) [![](https://img.shields.io/badge/node->=16.20-orange.svg)](https://nodejs.org/en/) [![](https://img.shields.io/badge/code style-eslint+prettier-hotpink.svg)](https://eslint.org/)

## overview

Arc blog 是由 monorepo 管理前后端项目。

| Project 项目                                                 | Description 描述                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [arc-cms](https://github.com/Arc-Blog/abeg-monorepo/tree/master/apps/arc-cms) | CMS for Arc 博客包含 Vue3、Vite、Vueuse、TailwindCss、Element-UI 和 Axios。 |
| [arc-web](https://github.com/Arc-Blog/abeg-monorepo/tree/master/apps/arc-web) | Arc 博客的网站应用程序，包含React，Next.js13，TailwindCss，styled-components，Axios。 |
| [arc-service](https://github.com/Arc-Blog/abeg-monorepo/tree/master/apps/arc-service) | Arc 博客的后端平台，包括Node.js，NestJS，MongoDB，GraphQL，JWT等。 |

### 安装 Node.js 和 [PNPM](https://pnpm.io/)

建议基本环境是 Node.js 16 LTS 和 PNPM。管理 Node.js 版本的更好方法是使用 nvm。而PNPM是一个快速，磁盘空间节省的包管理器。

```bash
# Installing NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Installing pnpm
npm install -g pnpm
```

### 安装 [commitizen](https://github.com/commitizen/cz-cli)

遵循 Angular 团队的提交消息指南，您的 git 提交将由 commitlint 检查，请使用 `git cz` 代替 `git commit` .因此，请全局安装 `commitizen` 。
