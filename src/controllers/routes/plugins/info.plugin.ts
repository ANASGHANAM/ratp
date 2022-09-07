import { ServerRegisterOptions } from '@hapi/hapi';
import InfoPlugin from '../info/info.plugin';

export default {
  plugin: InfoPlugin,
  options: {
    routes: {
      prefix: '/info',
    },
  } as ServerRegisterOptions,
};
