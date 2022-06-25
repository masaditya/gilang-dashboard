'use strict';

export const FindAPIBaseURL = (): string =>
  process.env.API_BASE_URL || '';

export const FindAppName = (): string => process.env.APP_NAME || '';
