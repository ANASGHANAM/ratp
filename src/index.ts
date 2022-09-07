import log from "./services/logger/logger";
import { archBriefServer } from "./controllers/routes/server";

const startServer = (): void => {
  Promise.resolve()
    .then(() => log.info("Starting server..."))
    .then(() => archBriefServer.init())
    .then(() => archBriefServer.start())
    .then(() => log.info("Server has been started"))
    .catch((err: Error) => log.error("Error while starting server", err));
};

startServer();
