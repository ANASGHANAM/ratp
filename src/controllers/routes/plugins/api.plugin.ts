import { ServerRegisterOptions } from "@hapi/hapi";
import ApiPlugin from "../api/api.plugin";

export default {
  plugin: ApiPlugin,
  options: {
    routes: {
      prefix: "/api",
    },
  } as ServerRegisterOptions,
};
