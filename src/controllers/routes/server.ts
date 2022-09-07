import { Server } from "@hapi/hapi";
import Joi from "joi";
import { config } from "../../config";
import log from "../../services/logger/logger";
// -- Plugins
import LoggerPlugin from "./plugins/logger.plugin";
import SwaggerPlugin from "./plugins/swagger.plugin";
import InfoPlugin from "./plugins/info.plugin";
import ApiPlugin from "./plugins/api.plugin";

const logConfig = (): void => {
  log.info(`server.protocol: ${config.server.protocol}`);
  log.info(`server.host: ${config.server.host}`);
  log.info(`server.port: ${config.server.port}`);
};

class ArchBriefServer {
  public server?: Server;

  public async init(): Promise<void> {
    log.info("=== Initialiazing server...");
    // -----------------------------------------------------------------------------
    // -- Check if server has already been initialized
    // -----------------------------------------------------------------------------
    if (this.server) {
      throw new Error("server has already been initialized");
    }
    // -----------------------------------------------------------------------------
    // -- Server configuration
    // -----------------------------------------------------------------------------
    this.server = new Server({
      port: config.server.port,
      host: config.server.host,
    });

    this.server.validator(Joi);
    // -----------------------------------------------------------------------------
    // -- Logger module
    // -----------------------------------------------------------------------------
    await this.server.register(LoggerPlugin);
    // -----------------------------------------------------------------------------
    // -- Swagger Plugins
    // -----------------------------------------------------------------------------
    await this.server.register(SwaggerPlugin);
    // -----------------------------------------------------------------------------
    // -- Info  Plugin
    // -----------------------------------------------------------------------------
    await this.server.register(InfoPlugin.plugin, InfoPlugin.options);
    // -----------------------------------------------------------------------------
    // -- API  Plugin
    // -----------------------------------------------------------------------------
    await this.server.register(ApiPlugin.plugin, ApiPlugin.options);
    // ---------------------------------------------------------------------------
    // -- Log configuration
    // ---------------------------------------------------------------------------
    logConfig();
    // ---------------------------------------------------------------------------
    log.info("=== Server has been initialized");
  }

  public async start(): Promise<void> {
    // ---------------------------------------------------------------------------
    // -- Start server
    // ---------------------------------------------------------------------------
    return Promise.resolve()
      .then(() => this.server?.start())
      .then((err: any) => {
        if (err) {
          log.error("Could not launch server!", err as Error);
          throw err;
        }
        log.info(`<< SERVER RUNNING [${this.server?.info.uri}] >>`);
      })
      .catch((err: Error) => {
        log.error("Could not launch server!", err);
      });
  }

  public async terminate(): Promise<void> {
    // ---------------------------------------------------------------------------
    // -- Terminate server
    // ---------------------------------------------------------------------------
    log.info("=== Terminating server...");
    try {
      if (this.server && this.server.info.started > 0) {
        await this.server.stop();
        log.info("Server has been stopped");
      }
    } catch (err) {
      log.error("Error while terminating server", err as Error);
    }
    log.info("=== Server has been terminated");
  }
}

export const archBriefServer = new ArchBriefServer();
