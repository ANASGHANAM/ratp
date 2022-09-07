//  ----------------------------------------------------------------------------
// - API PLUGIN (/api/*)
//  ----------------------------------------------------------------------------
import { Server } from "@hapi/hapi";
import Pack from "../../../../package.json";
import CatalogPlugin from "./catalog/catalog.plugin";
import { AppErrorType } from "../../../services/errors/app.error";

const register = async (server: Server): Promise<void> => {
  // ---------------------------------------------------------------------------
  // -- Register all API sub routes here
  // ---------------------------------------------------------------------------
  await server.register(CatalogPlugin, { routes: { prefix: "/catalog" } });
};

export const buildSwaggerDescription = (...args: AppErrorType[]) =>
  args.map((e) => `- <u>${e.code}</u>: ${e.message}`);

export default {
  name: "api",
  version: Pack.version,
  register,
};
