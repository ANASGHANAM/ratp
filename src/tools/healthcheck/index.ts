import Axios from "axios";
import { config } from "../../config";
import log from "../../services/logger/logger";

const checkServerStatus = async (url: string) => {
  try {
    const response = await Axios.get(url);

    if (response.status !== 200) {
      return false;
    }
    return true;
  } catch (error) {
    log.error((error as Error).message);
    return false;
  }
};

const connect = async () => {
  const url = `${config.server.protocol}://${config.server.host}:${config.server.port}/info/status`;
  log.info(`Connecting to : ${url}`);
  const isAlive = await checkServerStatus(url);
  log.info(`Server is ${isAlive ? "alive" : "not alive"}`);
  if (!isAlive) {
    process.exitCode = 1;
  }
};

const checkServer = (): void => {
  Promise.resolve()
    .then(() => log.info("Starting server checking..."))
    .then(() => connect())
    .then(() => log.info("Server has been checked"))
    .catch((err: Error) => {
      process.exitCode = 1;
      log.error("Error while checking server", err);
    });
};

checkServer();
