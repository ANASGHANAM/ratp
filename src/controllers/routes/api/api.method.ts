import Boom from "@hapi/boom";
import { AppError } from "../../../services/errors/app.error";
import { DsLogger } from "../../../services/logger/logger";

export const handleError = (
  logger: DsLogger,
  error: Error,
  messageToLog: string
): Boom.Boom => {
  logger.error(`${messageToLog}: ${error.message}`, error);
  const boom = Boom.boomify(error, { message: messageToLog });
  if (error instanceof AppError) {
    boom.output.statusCode = error.status;
    if (error.code) {
      boom.output.payload.code = error.code;
    }
    boom.reformat();
  }
  return boom;
};
