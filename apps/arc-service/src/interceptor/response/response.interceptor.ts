import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Moment from 'moment';
import * as _ from 'lodash';
import Logger from 'src/utils/logger';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const res = context.switchToHttp().getResponse();
    const params = !_.isEmpty(res.req.params);
    const query = !_.isEmpty(res.req.query);
    const body = !_.isEmpty(res.req.body);

    let logFormat = `response original url: ${res.req.originalUrl} Method: ${
      res.req.method
    } IP: ${res.req.ip} ${
      params ? `params: ${JSON.stringify(res.req.params)}` : ''
    } ${query ? `query: ${JSON.stringify(res.req.query)}` : ''} ${
      body ? `body: ${JSON.stringify(res.req.body)}` : ''
    } status code: ${res.statusCode}`;

    return next.handle().pipe(
      map((data) => {
        // console.log('全局响应拦截器方法返回内容后...');
        logFormat = `${logFormat} data: ${JSON.stringify(data)}`;
        Logger.info(logFormat);
        Logger.access(logFormat);

        return {
          status: 200,
          timestamp: Moment().format('YYYY-MM-DD HH:mm:ss'),
          // path: res.url,
          message: '请求成功',
          data: data,
        };
      }),
    );
  }
}
