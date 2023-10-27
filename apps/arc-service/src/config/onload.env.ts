import * as fs from 'fs';
import * as path from 'path';
const isProd = process.env.NODE_ENV === 'production'; // 是否生成是生产环境

function parseEnv() {
  // 开发环境
  const localEnv = path.resolve('.env.development');
  // console.log(localEnv);
  // 生产环境
  const prodEnv = path.resolve('.env.production');

  // 如果开发环境 和 生产环境不存在，抛出异常
  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件');
  }

  // 是生产环境，则返回生产路径，
  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;
  return { path: filePath };
}

export default parseEnv();
