# Arc rainbow blog

  <div align="center">
    <a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/node->=16.20-orange.svg" /></a>&nbsp;
    <a href="https://pnpm.io"><img src="https://img.shields.io/badge/pnpm->=8.9.2-deepgreen.svg" /></a>&nbsp;
    <a href="https://eslint.org"><img src="https://img.shields.io/badge/code style-eslint+prettier-hotpink.svg" /></a>&nbsp;
</div>

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

## [License 许可证](https://github.com/Arc-Blog/abeg-monorepo/blob/master/LICENSE)

根据MIT许可的条款获得许可 [MIT licensed](https://opensource.org/licenses/MIT).