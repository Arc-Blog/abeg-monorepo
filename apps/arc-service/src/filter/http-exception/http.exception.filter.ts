import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import * as Moment from 'moment';
import { Request, Response } from 'express';
import Logger from 'src/utils/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取请求的上下文对象
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // 获取异常对象状态码
    const status = exception.getStatus();

    const logFormat = `Request original url: ${request.originalUrl} Method: ${
      request.method
    } IP: ${
      request.ip
    } Status code: ${status} Response: ${exception.toString()}`;
    Logger.error(logFormat);
    console.log('http:======', logFormat);
    // 设置响应的状态码
    response.status(status).json({
      statusCode: status || response.statusCode,
      timestamp: Moment().format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
      error: exception.name,
      message: exception.message,
      stack: exception.stack,
    });
  }
}
