import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TypeORMError, QueryFailedError } from 'typeorm';

@Catch(TypeORMError)
export class TypormFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let code = 500;
    if (exception instanceof QueryFailedError) {
      code = exception.driverError.errno;
    }
    response.status(500).json({
      code,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
