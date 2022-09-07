import Joi, { ObjectSchema } from "joi";
import { AppErrorType } from "../../../services/errors/app.error";

export const expectedHeaders = Joi.object().unknown();

const buildErrorResponsePayload = (
  statusCode: number,
  error: string,
  codes?: AppErrorType[]
): ObjectSchema =>
  Joi.object({
    statusCode,
    error,
    message: statusCode === 500 ? error : Joi.string(),
    ...(codes?.length && {
      code: Joi.string()
        .allow(...codes.map((c) => c.code))
        .required(),
    }),
  });

export const emptyResponsePayload = Joi.object().empty();

export const operationResponsePayload400 = buildErrorResponsePayload(
  400,
  "Bad Request"
);
export const operationResponsePayload401 = buildErrorResponsePayload(
  401,
  "Unauthorized"
);
export const operationResponsePayload404 = buildErrorResponsePayload(
  404,
  "Not Found"
);
export const operationResponsePayload413 = buildErrorResponsePayload(
  413,
  "Request Entity Too Large"
);
export const operationResponsePayload415 = buildErrorResponsePayload(
  415,
  "Unsupported Media Type"
);
export const operationResponsePayload500 = buildErrorResponsePayload(
  500,
  "Internal Server Error"
);

export const operationResponsePayload409 = (...codes: AppErrorType[]) =>
  buildErrorResponsePayload(409, "Conflict", codes);
