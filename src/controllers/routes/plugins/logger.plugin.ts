import log from "../../../services/logger/logger";
import Pack from "../../../../package.json";
import {
  Lifecycle,
  Request,
  RequestEvent,
  ResponseToolkit,
  Server,
} from "@hapi/hapi";

const register = (server: Server): void => {
  // -------------------------------------------------------------------------
  // -- API logger
  // -------------------------------------------------------------------------
  server.ext(
    "onRequest",
    (request: Request, h: ResponseToolkit): Lifecycle.ReturnValue => {
      const { headers } = request || null;
      const { path, method } = request;
      log.info("Request execution started", {
        method: method || "",
        "x-trace-id": headers["x-trace-id"],
        path,
      });
      return h.continue;
    }
  );

  server.ext(
    "onPostHandler",
    (request: Request, h: ResponseToolkit): Lifecycle.ReturnValue => {
      const { headers } = request || null;
      const { path, method } = request;
      log.info("Request execution finished", {
        method: method || "",
        "x-trace-id": headers["x-trace-id"],
        path,
      });
      return h.continue;
    }
  );

  server.events.on(
    { name: "request", channels: "internal" },
    (request: Request, event: RequestEvent): void => {
      const { headers } = request || null;
      const { path, method } = request;
      log.info(
        `Unexpected event received during request execution: ${event.tags.toString()}`,
        {
          method: method || "",
          "x-trace-id": headers["x-trace-id"],
          path,
        }
      );
    }
  );
};

export default {
  name: "ab_api_logger",
  version: Pack.version,
  register,
};
