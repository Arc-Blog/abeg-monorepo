import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局导入
      cache: true,
      // envFilePath: [parseEnv.path], // 会读取根文件下 .env文件 `${process.env.NODE_ENV}.env`
      load: [configuration], // 读取的是自定义配置文件 configuration.ts 数据配置文件
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
