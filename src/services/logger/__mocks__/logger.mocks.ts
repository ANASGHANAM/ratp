import { DsLogger } from '../logger';

export const mockDebug = jest.fn();
export const mockInfo = jest.fn();
export const mockWarn = jest.fn();
export const mockError = jest.fn();
export const mockChild = jest.fn();

export const mockLogger: DsLogger = {
  child: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
};
