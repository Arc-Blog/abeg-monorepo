import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

import path from 'path';
import pkg from './package.json' assert { type: 'json' };

// 用于解析绝对路径
const resolvePath = (...args) => path.resolve(...args);
const ter = terser({
  compress: {
    // 去除 console
    drop_console: true,
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
    warnings: false,
  },
});

// 定义不需要打包类库的全局变量
const globals = {
  // 'vue-i18n': 'vue-i18n',
  // moment: 'moment',
  // vue: 'vue',
  // 'lodash-es': 'lodash-es',
  'crypto-js': 'CryptoJS',
};
const config = [
  // 生成 .d.ts 类型声明文件
  {
    input: resolvePath('./src/index.ts'),
    output: {
      file: resolvePath('./', pkg.types),
      format: 'es',
    },
    plugins: [dts()],
  },
  {
    input: './src/index.ts', // 指定的打包入口文件
    output: [
      // cjs 格式打包
      { file: resolvePath('./', pkg.main), format: 'cjs', globals /* sourcemap: true */ },
      // es 格式打包
      { file: resolvePath('./', pkg.module), format: 'es', globals /* sourcemap: true */ },
      // umd 格式打包
      {
        file: resolvePath('./', pkg.unpkg),
        format: 'umd',
        name: 'echo9zUtils',
        // sourcemap: true,
        globals,
      },
      { file: resolvePath('./dist/arc-util.min.cjs'), format: 'cjs', globals, plugins: [ter] },
      { file: resolvePath('./dist/arc-util.min.mjs'), format: 'es', globals, plugins: [ter] },
      { file: resolvePath('./dist/arc-util.global.js'), format: 'umd', globals, plugins: [ter], name: 'echo9zUtils' },
    ],
    plugins: [
      json(),
      nodeResolve(),
      // nodeResolve({ modulesOnly: true, extensions: ['.js', '.ts'] }),
      // include 和 exclude 路径应该处理实际路径而不是符号链接路径（例如， ../common/node_modules/** 而不是 node_modules/** ）
      commonjs({ extensions: ['.js', '.ts'] }),
      // 解析ts
      typescript({
        compilerOptions: {
          lib: ['es5', 'es6', 'dom'],
          target: 'es5',
        },
      }),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
        extensions: ['.js', '.ts'], // 如果您想使用此插件转译 TypeScript 文件，则必须在此选项中包含 .ts 和 .tsx，如果vue加'.vue'
        // presets: ['@babel/preset-env', '@babel/preset-typescript'],
        presets: ['@babel/preset-env'],
        plugins: [
          // '@babel/plugin-external-helpers', 'external'- 仅当您知道自己在做什么时才使用它。它将引用全局对象上的帮助程序。与 结合使用。
          [
            '@babel/plugin-transform-runtime',
            {
              useESModules: true, // 仅适用于 es 和 cjs 格式，并且您需要确保在创建 ES 输出时将 useESModules 选项设置为 @babel/plugin-transform-runtime ： true
            },
          ],
        ],
      }),
      alias({
        resolve: ['.js', 'ts'], // 可选，默认情况下这只会查找 .js 文件或文件夹
        entries: {
          '@': resolvePath('src'),
        },
      }),
    ],
    // 不需要打包的类库
    external: ['lodash'], // 告诉 rollup.js 哪些是外部的类库，不需要将这些外部类库进行打包。
  },
];

export default config;
