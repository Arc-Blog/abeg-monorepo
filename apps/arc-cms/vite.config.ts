import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import path from 'path'
const pathSrc = path.resolve(__dirname, 'src')



// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');

  // 返回配置对象
  return {
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
        eslintrc: {
          enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false 
          filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
        },
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
      }),
      Components({
        dts: path.resolve(pathSrc, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
      }),
    ],
    // 别名
    resolve: {
      alias: {
        "@": pathSrc
      }
    },
    server: {
      host: "0.0.0.0", // 允许IP访问
      port: Number(env.VITE_APP_PORT), // 应用端口
      open: true, // 运行是否自动打开浏览器
      /** 接口代理解决跨域 */
      [env.VITE_APP_BASE_API]: { // 将 /dev-api 开头的请求转发至 target
        changeOrigin: true,
        target: env.VITE_APP_TARGET_URL, // https://api.xxx.com
        rewrite: (path) => // 将/dev-api开头的替换为 空字符
          path.replace(
            new RegExp("^" + env.VITE_APP_BASE_API), // ^/dev-api
            env.VITE_APP_TARGET_BASE_API // ""
          ), 
      }
    }
  }
})
