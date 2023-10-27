import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // 连接数据库
  async onModuleInit() {
    await this.$connect();
    console.log('connect database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('onModuleDestroy');
  }

  async enableShutdownHooks(app: INestApplication) {
    // 客户端断开连接之前运行代码
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
