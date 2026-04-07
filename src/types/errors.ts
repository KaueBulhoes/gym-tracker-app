export type ErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_ALREADY_EXISTS'
  | 'WEAK_PASSWORD'
  | 'USER_NOT_FOUND'
  | 'NETWORK_ERROR'
  | 'SESSION_EXPIRED'
  | 'NOT_FOUND'
  | 'PERMISSION_DENIED'
  | 'VALIDATION_ERROR'
  | 'UNKNOWN';

export class AppError extends Error {
  code: ErrorCode;
  originalError?: unknown;

  constructor(code: ErrorCode, message: string, originalError?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.originalError = originalError;
  }
}
