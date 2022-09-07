import { Server, ServerInjectOptions, ServerInjectResponse } from '@hapi/hapi';
import HttpStatusCode from '../../helper/constants/HttpStatusCode';

const buildApi = () => `/info/status`;

const getServerOptions = () =>
  ({
    method: 'GET',
    url: buildApi(),
  } as ServerInjectOptions);

describe('GET /info/status', () => {
  const Global = global as typeof globalThis & {
    server: Server;
  };

  test('should return ok', async () => {
    /** given */
    /** when */
    const response: ServerInjectResponse = await Global.server.inject(getServerOptions());
    /** then */
    expect(response.statusCode).toEqual(HttpStatusCode.OK);
    expect(response.result).toEqual(null);
  });
});
