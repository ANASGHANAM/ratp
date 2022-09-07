//  ----------------------------------------------------------------------------
// - STATUS PLUGIN (/info/status)
//  ----------------------------------------------------------------------------
import { Server } from "@hapi/hapi";
import Pack from "../../../../package.json";
import statusPlugin from "./status/status.plugin";

const register = async (server: Server) => {
  // ---------------------------------------------------------------------------
  // -- {REGISTER} info sub path [ /info/status ]
  // ---------------------------------------------------------------------------
  await server.register(statusPlugin, {
    routes: {
      prefix: "/status",
    },
  });
};

export default {
  name: "info_api",
  version: Pack.version,
  register,
};
