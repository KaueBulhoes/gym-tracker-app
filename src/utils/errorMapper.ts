import type { AuthError } from '@supabase/supabase-js';
import { AppError } from '../types/errors';

const AUTH_ERROR_MAP: Record<string, { code: string; message: string }> = {
  invalid_credentials: {
    code: 'INVALID_CREDENTIALS',
    message: 'E-mail ou senha incorretos',
  },
  user_already_registered: {
    code: 'EMAIL_ALREADY_EXISTS',
    message: 'Este e-mail já está cadastrado',
  },
  email_exists: {
    code: 'EMAIL_ALREADY_EXISTS',
    message: 'Este e-mail já está cadastrado',
  },
  weak_password: {
    code: 'WEAK_PASSWORD',
    message: 'A senha deve ter pelo menos 6 caracteres',
  },
  user_not_found: {
    code: 'USER_NOT_FOUND',
    message: 'Usuário não encontrado',
  },
  session_not_found: {
    code: 'SESSION_EXPIRED',
    message: 'Sua sessão expirou. Faça login novamente',
  },
  email_not_confirmed: {
    code: 'VALIDATION_ERROR',
    message: 'Confirme seu e-mail antes de fazer login',
  },
  otp_expired: {
    code: 'SESSION_EXPIRED',
    message: 'O código expirou. Solicite um novo',
  },
};

const DB_ERROR_MAP: Record<string, { code: string; message: string }> = {
  '23505': {
    code: 'VALIDATION_ERROR',
    message: 'Este registro já existe',
  },
  '23503': {
    code: 'NOT_FOUND',
    message: 'Registro relacionado não encontrado',
  },
  '42501': {
    code: 'PERMISSION_DENIED',
    message: 'Você não tem permissão para esta ação',
  },
  PGRST116: {
    code: 'NOT_FOUND',
    message: 'Registro não encontrado',
  },
};

export const mapAuthError = (error: AuthError): AppError => {
  if (isNetworkError(error)) {
    return new AppError('NETWORK_ERROR', 'Sem conexão com a internet', error);
  }

  const errorCode = extractAuthErrorCode(error);
  const mapped = AUTH_ERROR_MAP[errorCode];

  if (mapped) {
    return new AppError(
      mapped.code as AppError['code'],
      mapped.message,
      error,
    );
  }

  return new AppError('UNKNOWN', error.message, error);
};

export const mapDatabaseError = (error: {
  code?: string;
  message: string;
}): AppError => {
  if (error.code && DB_ERROR_MAP[error.code]) {
    const mapped = DB_ERROR_MAP[error.code];
    return new AppError(
      mapped.code as AppError['code'],
      mapped.message,
      error,
    );
  }

  return new AppError('UNKNOWN', error.message, error);
};

const isNetworkError = (error: AuthError): boolean => {
  const msg = error.message?.toLowerCase() ?? '';
  return (
    msg.includes('fetch') ||
    msg.includes('network') ||
    msg.includes('failed to fetch') ||
    msg.includes('econnrefused') ||
    msg.includes('timeout')
  );
};

const extractAuthErrorCode = (error: AuthError): string => {
  if ('code' in error && typeof error.code === 'string') {
    return error.code;
  }
  const msg = error.message?.toLowerCase() ?? '';
  if (msg.includes('invalid login credentials')) {
    return 'invalid_credentials';
  }
  if (msg.includes('already registered')) {
    return 'user_already_registered';
  }
  return '';
};
