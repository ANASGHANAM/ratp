export interface AppErrorType {
  status: number;
  message: string;
  code: string;
}

export const ERR10000: AppErrorType = {
  status: 409,
  message: 'Template id %1 is not a template',
  code: 'ERR10000',
};

export const ERR10001: AppErrorType = {
  status: 409,
  message: `Template name %1 is already existing`,
  code: 'ERR10001',
};

export const ERR10002: AppErrorType = {
  status: 409,
  message: `Arch brief %1 does not exist`,
  code: 'ERR10002',
};

export const ERR10003: AppErrorType = {
  status: 409,
  message: `Arch brief id %1 is not an arch brief`,
  code: 'ERR10003',
};

export const ERR10004: AppErrorType = {
  status: 409,
  message: `Arch brief %1 has no node`,
  code: 'ERR10004',
};

export class AppError extends Error {
  public status: number;
  public message: string;
  public code?: string;

  public constructor(message: string, status?: number, code?: string) {
    // Parent constructor
    super();
    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;
    this.message = message;
    // HTTP status (if needed)
    this.status = status || 500;
    this.code = code;
  }

  public static build = (e: AppErrorType, ...args: string[]) =>
    new AppError(
      args.reduce((pV, cV, cI) => pV.replace(`%${cI + 1}`, cV), e.message),
      e.status,
      e.code
    );
}
