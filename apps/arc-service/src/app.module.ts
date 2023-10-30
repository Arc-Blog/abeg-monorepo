import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './module/email/email.module';
import { UserModule } from './module/user/user.module';
import configuration from './config/configuration';
import parseEnv from './config/onload.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局导入
      cache: true,
      envFilePath: [parseEnv.path], // 会读取根文件下 .env文件 `${process.env.NODE_ENV}.env`
      load: [configuration], // 读取的是自定义配置文件 configuration.ts 数据配置文件
    }),
    // 设置对服务器请求次数
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const throttle = config.get('throttle');
        return [
          {
            ttl: throttle.ttl, // 1分钟
            limit: throttle.limit, // 请求100次
          },
        ];
      },
    }),
    PrismaModule,
    EmailModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
