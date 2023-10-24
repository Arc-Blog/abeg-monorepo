import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';

const PORT: string | number = process.env.APP_PORT || 18080;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 路径前缀：如：http://www.test.com/api/v1/user
  app.setGlobalPrefix('api');

  //cors：跨域资源共享，允许跨站访问
  app.enableCors();

  // 防止跨站脚本攻击
  // 配置cross-origin 接口图片的资源光问题
  app.use(helmet());
  // app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

  //配置静态资源目录
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // 配置基于模板引擎存放的模板文件
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // 这是设置模板引擎, 需要先安装：pnpm add ejs
  app.setViewEngine('ejs');

  await app.listen(
    PORT,
    () => console.log(`服务已经启动 http://localhost:${PORT}`),
    // Logger.log(`服务已经启动 http://localhost:${PORT}`),
  );
}
bootstrap();
