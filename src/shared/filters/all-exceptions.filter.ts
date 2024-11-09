import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { IS_PRODUCTION } from '@/config';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const request = ctx.getRequest();

    const stack =
      exception instanceof Error ? exception.stack : (exception as string);
    const message = exception instanceof Error ? exception.message : exception;

    let responseBody = {
      timestamp: new Date().toISOString(),
      error: {
        message: message,
        stack:
          this.needToShowStack() && stack
            ? stack
                .toString()
                .split('\n')
                .map((line) => line.trim())
            : [],
      },
      result:
        exception instanceof HttpException
          ? exception.getResponse()
          : undefined,
    };

    this.logger.error(
      `${httpStatus} | ${request.method} ${request.url} | ${message}`,
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private needToShowStack(): boolean {
    return !IS_PRODUCTION;
  }
}
