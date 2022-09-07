import { mockDebug, mockInfo, mockWarn, mockError, mockChild } from './__mocks__/logger.mocks';
jest.mock('pino', () => () => ({
  debug: mockDebug,
  info: mockInfo,
  warn: mockWarn,
  error: mockError,
  child: mockChild,
}));

import logger, { formatLevel } from '../logger/logger';

describe('DsLogger', () => {
  afterEach(() => jest.resetAllMocks());

  it.each([
    { first: 'test' },
    { first: 'test', second: new Error('oups') },
    { first: 'test', second: { key: 'value' } },
    { first: 'test', second: { key: 'value' }, third: new Error('oups') },
    { first: 'test', second: new Error('bad'), third: new Error('oups') },
    { first: 'test', second: undefined, third: new Error('oups') },
  ])('should call pino debug method', (testCase) => {
    /* given */
    /* when */
    if (testCase.third) {
      logger.debug(testCase.first, testCase.second, testCase.third);
    } else if (testCase.second) {
      logger.debug(testCase.first, testCase.second);
    } else {
      logger.debug(testCase.first);
    }
    /* then */
    if (testCase.third) {
      expect(mockDebug).toBeCalledWith(
        {
          ...(testCase.second instanceof Error ? {} : testCase.second),
          err: testCase.third,
        },
        testCase.first
      );
    } else if (testCase.second) {
      expect(mockDebug).toBeCalledWith(
        {
          ...(testCase.second instanceof Error ? { err: testCase.second } : testCase.second),
        },
        testCase.first
      );
    } else {
      expect(mockDebug).toBeCalledWith(testCase.first);
    }
  });

  it.each([
    { first: 'test' },
    { first: 'test', second: new Error('oups') },
    { first: 'test', second: { key: 'value' } },
    { first: 'test', second: { key: 'value' }, third: new Error('oups') },
    { first: 'test', second: undefined, third: new Error('oups') },
  ])('should call pino info method', (testCase) => {
    /* given */
    /* when */
    if (testCase.third) {
      logger.info(testCase.first, testCase.second, testCase.third);
    } else if (testCase.second) {
      logger.info(testCase.first, testCase.second);
    } else {
      logger.info(testCase.first);
    }
    /* then */
    if (testCase.third) {
      expect(mockInfo).toBeCalledWith(
        {
          ...(testCase.second instanceof Error ? {} : testCase.second),
          err: testCase.third,
        },
        testCase.first
      );
    } else if (testCase.second) {
      expect(mockInfo).toBeCalledWith(
        {
          ...(testCase.second instanceof Error ? { err: testCase.second } : testCase.second),
        },
        testCase.first
      );
    } else {
      expect(mockInfo).toBeCalledWith(testCase.first);
    }
  });

  it.each([
    { first: 'test' },
    { first: 'test', second: new Error('oups') },
    { first: 'test', second: { key: 'value' } },
    { first: 'test', second: { key: 'value' }, third: new Error('oups') },
    { first: 'test', second: undefined, third: new Error('oups') },
  ])('should call pino warn method', (testCase) => {
    /* given */
    /* when */
    if (testCase.third) {
      logger.warn(testCase.first, testCase.second, testCase.third);
    } else if (testCase.second) {
      logger.warn(testCase.first, testCase.second);
    } else {
      logger.warn(testCase.first);
    }
    /* then */
    if (testCase.third) {
      expect(mockWarn).toBeCalledWith(
        {
          ...(testCase.second instanceof Error ? {} : testCase.second),
          err: testCase.third,
        },
        testCase.first
      );
    } else if (testCase.second) {
      expect(mockWarn).toBeCalledWith(
        {
          ...(testCase.second instanceof Error ? { err: testCase.second } : testCase.second),
        },
        testCase.first
      );
    } else {
      expect(mockWarn).toBeCalledWith(testCase.first);
    }
  });

  it.each([
    { first: 'test' },
    { first: 'test', second: new Error('oups') },
    { first: 'test', second: { key: 'value' } },
    { first: 'test', second: { key: 'value' }, third: new Error('oups') },
    { first: 'test', second: undefined, third: new Error('oups') },
  ])('should call pino error method', (testCase) => {
    /* given */
    /* when */
    if (testCase.third) {
      logger.error(testCase.first, testCase.second, testCase.third);
    } else if (testCase.second) {
      logger.error(testCase.first, testCase.second);
    } else {
      logger.error(testCase.first);
    }
    /* then */
    if (testCase.third) {
      expect(mockError).toBeCalledWith(
        {
          ...(testCase.second instanceof Error ? {} : testCase.second),
          err: testCase.third,
        },
        testCase.first
      );
    } else if (testCase.second) {
      expect(mockError).toBeCalledWith(
        {
          ...(testCase.second instanceof Error ? { err: testCase.second } : testCase.second),
        },
        testCase.first
      );
    } else {
      expect(mockError).toBeCalledWith(testCase.first);
    }
  });

  it('should create child logger', () => {
    /* given */
    /* when */
    const res = logger.child({ key: 'value' });
    /* then */
    expect(res).toBeDefined();
    expect(res.constructor.name).toEqual('DsLoggerImpl');
    expect(mockChild).toBeCalledWith({ key: 'value' });
  });

  it('shoud format level', () => {
    /* given */
    /* when */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const res = formatLevel.level('info');
    /* then */
    expect(res).toEqual({ level: 'info' });
  });
});
