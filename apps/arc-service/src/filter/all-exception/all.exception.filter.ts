import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as Moment from 'moment';
import * as _ from 'lodash';
import Logger from 'src/utils/logger';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // console.log('--', exception);

    // 自定义的异常信息结构, 响应用
    const error_info = exception ? exception.stack : exception;
    let error_msg = exception.response
      ? exception.response.message
        ? exception.response.message
        : exception.response.errorMsg
      : 'internal server error';
    const error_code = exception.response?.errorCode
      ? exception.response.errorCode
      : 500;

    // 404 异常响应
    if (status === HttpStatus.NOT_FOUND) {
      error_msg = `资源不存在! 接口 ${request.method} -> ${request.url} 无效!`;
    }
    // console.log(request);

    const params = !_.isEmpty(request.params)
      ? `params: ${JSON.stringify(request.params)}`
      : '';
    const query = !_.isEmpty(request.query)
      ? `query: ${JSON.stringify(request.query)}`
      : '';
    const body = !_.isEmpty(request.body)
      ? `body: ${JSON.stringify(request.body)}`
      : '';

    // const params = request.params === '{}' ? 'params:' + request.params : '';
    // const query = request.query === '{}' ? 'query:' + request.query : '';
    // const body = request.body === '{}' ? 'body:' + request.body : '';
    const logFormat = `url: ${request.originalUrl} Method: ${request.method} IP: ${request.ip} HttpCode: ${status} ${params} ${query} ${body} statusCode: ${error_code} errorMsg: ${error_msg} errorInfo: ${error_info}`;

    Logger.error(logFormat);
    response.status(status || 500).json({
      status: status || 500,
      timestamp: Moment().format('YYYY-MM-DD HH:mm:ss'),
      // path: request.url,
      msg: `${(exception as any).message}`,
    });
  }
}
