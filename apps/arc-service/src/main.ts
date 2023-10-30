import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
// import * as csurf from 'csurf';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptor/response/response.interceptor';
import { RequestMiddleware } from './middleware/request/request.middleware';
import { /* HttpExceptionFilter, */ AllExceptionFilter } from './filter';

const PORT: string | number = process.env.APP_PORT || 18080;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // HTTP开启Connection: Keep-Alive
    forceCloseConnections: true,
  });

  // 路径前缀：如：http://www.test.com/api/v1/user
  app.setGlobalPrefix('api');

  // 添加代理，以获得正确的ip
  app.set('trust proxy', 1);

  //cors：跨域资源共享，允许跨站访问
  app.enableCors();

  // 防止跨站脚本攻击
  // 配置cross-origin 接口图片的资源光问题
  // app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

  //CSRF保护：跨站点请求伪造
  // app.use(csurf());

  //配置静态资源目录
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // 配置基于模板引擎存放的模板文件
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // 这是设置模板引擎, 需要先安装：pnpm add ejs
  app.setViewEngine('ejs');

  // 使用压缩中间件启用 gzip 压缩
  app.use(compression());

  // 配置swagger文档
  const config = new DocumentBuilder()
    .setTitle('echo9z blog')
    .setDescription('The cats API description')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 添加中间件，监听所有的request路由，并打印日志
  app.use(new RequestMiddleware().use);

  // 捕获全局异常
  const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter as any));

  // 全局统一响应
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(
    PORT,
    () => console.log(`服务已经启动 http://localhost:${PORT}`),
    // Logger.log(`服务已经启动 http://localhost:${PORT}`),
  );
}
bootstrap();
