//  ----------------------------------------------------------------------------
// - STATUS PLUGIN (/info/status)
//  ----------------------------------------------------------------------------
import { Server } from "@hapi/hapi";
import Pack from "../../../../../package.json";
import { check } from "./status.methods";

const register = (server: Server) => {
  // ---------------------------------------------------------------------------
  // -- {ROUTE} Get info status [ /info/status ]
  // ---------------------------------------------------------------------------
  server.route({
    method: "GET",
    path: "/",
    handler: check,
    options: {
      tags: ["api", "Info"],
    },
  });
};

export default {
  name: "status_api",
  version: Pack.version,
  register,
};
