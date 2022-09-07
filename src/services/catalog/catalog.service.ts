import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AppError } from "../errors/app.error";
import { DsLogger } from "../logger/logger";

export interface CatalogFilter {
  line: string;
  from: number;
  size: number;
}

export interface PublicWC {
  gps_coord: string;
  accessible: boolean;
  free: boolean;
  stationName: string;
}

interface Record {
  fields: {
    ligne: string;
    coord_geo: string[];
    accessible_au_public: string;
    tarif_gratuit_payant: string;
  };
}

export class CatalogService {
  public static async getCatalog(
    logger: DsLogger,
    filter: CatalogFilter
  ): Promise<PublicWC[]> {
    try {
      return CatalogService.getRecords(filter);
    } catch (error) {
      logger.error(
        "Unexpected error while getting requirement definition events",
        error as Error
      );
      throw new AppError(
        "Unexpected error while getting requirement definition events"
      );
    }
  }

  public static async getRecords(filter: CatalogFilter): Promise<[]> {
    const url = `https://data.ratp.fr/api/records/1.0/search/?dataset=sanitaires-reseau-ratp&q=&facet=ligne&facet=station&facet=tarif_gratuit_payant&facet=acces_bouton_poussoir&facet=en_zone_controlee&facet=hors_zone_controlee_station&facet=hors_zone_controlee_voie_publique`;
    const requestConf = {
      headers: {
        "data-Type": "application/json",
      },
    } as AxiosRequestConfig<any>;
    try {
      const axiosInstance = axios.create(requestConf);
      const response = await axiosInstance.get(url, requestConf);

      if (response.status !== 200) {
        throw new AppError(
          CatalogService.getAxiosLogError(response),
          CatalogService.getErrorStatus(response.status)
        );
      }
      return response.data.records
        .filter((record: Record) => record.fields.ligne === filter.line)
        .map((record: Record) => ({
          ligne: record.fields.ligne,
          coord_geo: record.fields.coord_geo,
          accessible_au_public: record.fields.accessible_au_public,
          tarif_gratuit_payant: record.fields.tarif_gratuit_payant,
        }));
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        axios.isAxiosError(error)
          ? CatalogService.getAxiosLogError(error.response)
          : `Error while calling internal RATP server: ${
              (error as Error).message
            }`,
        axios.isAxiosError(error)
          ? CatalogService.getErrorStatus(error.response?.status)
          : 500
      );
    }
  }

  private static getErrorStatus(status?: number) {
    return status === 401 || status === 403 || status === 404 ? 403 : 500;
  }

  private static getAxiosLogError(response?: AxiosResponse) {
    return `Internal RATP API answered with error [status=${
      response?.status
    }], [statusText=${response?.statusText}]: ${JSON.stringify(
      response?.data
    )}`;
  }
}
