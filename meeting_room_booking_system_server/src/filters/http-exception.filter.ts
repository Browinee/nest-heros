import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
  Catch,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as requestIp from 'request-ip';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    debugger;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const httpStatus = exception.getStatus();

    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toISOString(),
      ip: requestIp.getClientIp(request),
      exception: exception['name'],
      error: exception['response'] || HttpStatus.INTERNAL_SERVER_ERROR,
    };
    this.logger.error(exception.message, exception.stack);
    response.status(httpStatus).json({
      code: httpStatus,
      timestamp: new Date().toISOString(),
      message: exception.message || exception.name,
    });
  }
}
