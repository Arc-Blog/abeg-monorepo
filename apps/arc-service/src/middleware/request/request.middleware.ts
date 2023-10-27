import { Injectable, NestMiddleware } from '@nestjs/common';
import * as _ from 'lodash';
import Logger from 'src/utils/logger';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const code = res.statusCode; // 响应状态吗
    next();

    // 组装信息
    const params = !_.isEmpty(req.params);
    const query = !_.isEmpty(req.query);
    const body = !_.isEmpty(req.body);
    const logFormat = `request original url: ${req.originalUrl} method: ${
      req.method
    } IP: ${req.ip} Status code: ${code} ${
      params ? `params: ${JSON.stringify(req.params)}` : ''
    } ${query ? `query: ${JSON.stringify(req.query)}` : ''} ${
      body ? `body: ${JSON.stringify(req.body)}` : ''
    }`;

    // 根据状态码进行日志类型区分
    if (code >= 500) {
      Logger.error(logFormat);
    } else if (code >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.access(logFormat);
      Logger.log(logFormat);
    }
  }
}
