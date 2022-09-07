import { Lifecycle, Request, ResponseToolkit } from "@hapi/hapi";
import logger from "../../../../services/logger/logger";
import {
  CatalogFilter,
  CatalogService,
} from "../../../../services/catalog/catalog.service";
import { handleError } from "../api.method";

export const loadCategory = async (
  request: Request,
  h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> => {
  const filters = request.query as CatalogFilter;
  try {
    if (!filters) {
      return h.response().code(400).takeover();
    }
    return h.response(await CatalogService.getCatalog(logger, filters));
  } catch (error) {
    throw handleError(
      logger,
      error as Error,
      `Error while loading catalog by filters ${JSON.stringify(filters)}}`
    );
  }
};
