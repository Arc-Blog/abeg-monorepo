import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new HttpException('请求失败', 500);
    throw new Error('Method not hello.');
    return 'Hello World!';
  }
}
