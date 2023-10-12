import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from "unplugin-icons/vite"; // 按需访问数千个图标作为组件通用插件https://iconify.design/
import IconsResolver from "unplugin-icons/resolver";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' // 用于生成 svg 雪碧图 https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
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
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({ prefix: 'icon', }),
        ], 
      }),
      Components({
        dts: path.resolve(pathSrc, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"] // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          }),
        ],
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
      // 
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      })
    ],
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        // define global scss variable
        // 加载全局样式变量
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
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
