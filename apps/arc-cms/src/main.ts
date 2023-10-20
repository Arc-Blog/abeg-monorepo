import { createApp } from 'vue';
import { setupStore } from '@/store';
// import { add } from "@arc/utils";
// import "./style.css";
import App from './App.vue';
import 'virtual:svg-icons-register';

// 引入重置样式
import './styles/reset.scss';
// // 导入公共样式
import './styles/index.scss';
// // 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import './styles/tailwind.css';

const app = createApp(App);
// 全局注册 自定义指令(directive)
// setupDirective(app);
// 全局注册 状态store
setupStore(app);

app.mount('#app');
