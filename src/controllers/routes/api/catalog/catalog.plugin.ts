//  ----------------------------------------------------------------------------
// - Catalog PLUGIN (/catalog)
//  ----------------------------------------------------------------------------
import Pack from "../../../../../package.json";
import { loadCategory } from "./catalog.method";
import {
  expectedHeaders,
  operationResponsePayload400,
  operationResponsePayload401,
  operationResponsePayload415,
  operationResponsePayload500,
} from "../api.validation";
import { Server } from "@hapi/hapi";
import { importCatalogQuery } from "./catalog.validation";

const register = (server: Server) => {
  // ---------------------------------------------------------------------------
  // -- {ROUTE} GET public WC catalog [ /api/catalog ]
  // ---------------------------------------------------------------------------
  server.route({
    method: "GET",
    path: "/",
    handler: loadCategory,
    options: {
      plugins: {
        "hapi-swagger": {
          responses: {
            202: { description: "Accepted" },
            400: { description: "Missing parameters" },
            401: { description: "x-userid is incorrect" },
            403: {
              description: `Forbidden - Missing permission to the user`,
            },
            415: {
              description:
                "Request must set Content-type header to application/json",
            },
            500: {
              description: "Something goes wrong while handling this request",
            },
          },
        },
      },
      validate: { headers: expectedHeaders, query: importCatalogQuery },
      response: {
        status: {
          400: operationResponsePayload400,
          401: operationResponsePayload401,
          415: operationResponsePayload415,
          500: operationResponsePayload500,
        },
      },
      description: "Route to import catalog from remote RATP service",
      tags: ["api", "Catalog"],
      notes: ["User shall be authenticated and have needed authorizations."],
    },
  });
};

export default {
  name: "Catalog",
  version: Pack.version,
  register,
};
