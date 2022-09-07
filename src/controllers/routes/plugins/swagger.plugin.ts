import HapiSwagger, { RegisterOptions } from "hapi-swagger";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Pack from "../../../../package.json";
import { ServerRegisterPluginObject } from "@hapi/hapi";

export default [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: {
      info: {
        title: "ratp-technical-test  API",
        version: Pack.version,
      },
      grouping: "tags",
      sortEndpoints: "ordered",
      tags: [
        { name: "Info", description: "Information about the service" },
        { name: "Catalog", description: "Catalog endpoints" },
      ],
    } as RegisterOptions,
  },
] as Array<ServerRegisterPluginObject<any>>;
