import { Config } from '@jest/types';
import NodeEnvironment from 'jest-environment-node';
import { archBriefServer } from '../controllers/routes/server';

export default class JestIntegrationEnvironment extends NodeEnvironment {
  public constructor(config: Config.ProjectConfig) {
    super(config);
  }

  public async setup() {
    await super.setup();
    await archBriefServer.init();
    await archBriefServer.start();
    this.global.server = archBriefServer.server;
  }

  public async teardown() {
    await archBriefServer.terminate();
    this.global.server = undefined;
    await super.teardown();
  }

  public getVmContext() {
    return super.getVmContext();
  }
}
