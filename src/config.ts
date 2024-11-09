import dotenv from 'dotenv';
import path from 'path';

function getEnvironmentFilePath(): string {
  switch (process.env.NODE_ENV) {
    case 'production':
    case 'development':
      return '.env';
    case 'local':
      return '.env.local';
    default:
      return '.env';
  }
}

dotenv.config({
  path: path.resolve(getEnvironmentFilePath()),
});

function required<T>(key: string, defaultValue = ''): T {
  if (!process.env[key] && typeof defaultValue === 'undefined') {
    throw new Error('Missing required environment variable: ' + key);
  }
  return (process.env[key] as T) || (defaultValue as T);
}

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_TEST = process.env.NODE_ENV === 'test';
export const IS_LOCAL = process.env.NODE_ENV
  ? process.env.NODE_ENV.toString().startsWith('local')
  : false;

export const config = {
  NODE_ENV: required<string>('NODE_ENV'),
  PORT: required<number>('PORT'),

  // Persistance
  MYSQL_HOST: required<string>('MYSQL_HOST'),
  MYSQL_USERNAME: required<string>('MYSQL_USERNAME'),
  MYSQL_PASSWORD: required<string>('MYSQL_PASSWORD'),
  MYSQL_DATABASE: required<string>('MYSQL_DATABASE'),

  JWT_SECRET: required<string>('JWT_SECRET'),
};
