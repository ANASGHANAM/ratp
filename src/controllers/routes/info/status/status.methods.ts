import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';

export const check = (request: Request, h: ResponseToolkit, error?: Error): ResponseObject =>
  error ? h.response(error).code(500) : h.response().code(200);
