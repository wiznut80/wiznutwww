import {withSentryConfig} from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_VERSION: process.env.APP_VERSION,
    APP_STAGE: process.env.PHASE,
    WIZNUT_API_BASE_URL: process.env.WIZNUT_API_BASE_URL,
    LAN_BASE_URL: process.env.LAN_BASE_URL,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    SENTRY_PROJECT_NAME: process.env.SENTRY_PROJECT_NAME,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  async rewrites() {
    const lanBaseUrl = process.env.LAN_BASE_URL;
    const rewritesConfig = [
      {
        source: '/lan/:path*',
        destination: `${lanBaseUrl}/:path*`,
      },
    ];
    console.log('[LAN_BASE_URL]', lanBaseUrl);
    console.log('[Rewrites configuration]', rewritesConfig);

    return rewritesConfig;
  },
};

const phaseConfigs = {
  local: {
    WIZNUT_API_BASE_URL: "https://www.wiznut.com/api",
    LAN_BASE_URL: "https://xxxxx.xxxxx.xxx",
    GA_TRACKING_ID: "GA-xxxxxxxx",
    SENTRY_PROJECT_NAME: "wiznut-fe-dev",
    SENTRY_DSN: "https://xxxxxxx@sentry-uit.wiznut.com/908",
  },
  alpha: {
    WIZNUT_API_BASE_URL: "https://www.wiznut.com/api",
    LAN_BASE_URL: "https://xxxxx.xxxxx.xxx",
    GA_TRACKING_ID: "GA-xxxxxxxxx",
    SENTRY_PROJECT_NAME: "wiznut-fe-dev",
    SENTRY_DSN: "https://xxxxxxxxx0@sentry-uit.wiznut.com/908",
  },
  beta: {
    WIZNUT_API_BASE_URL: "https://www.wiznut.com/api",
    LAN_BASE_URL: "https://xxxxx.xxxxx.xxx",
    GA_TRACKING_ID: "GA-xxxxxxxxx",
    SENTRY_PROJECT_NAME: "wiznut-fe-dev",
    SENTRY_DSN: "https://xxxxxxxxxxxxxx@sentry-uit.wiznut.com/908",
  },
  prod: {
    WIZNUT_API_BASE_URL: "https://www.wiznut.com/api",
    LAN_BASE_URL: "https://xxxxx.xxxxx.xxx",
    GA_TRACKING_ID: "GA-xxxxxxxxxxxxxx",
    SENTRY_PROJECT_NAME: "wiznut-fe-prod",
    SENTRY_DSN: "https://xxxxxxxxxxxxxx@sentry-uit.wiznut.com/909",
  },
};

const currentPhase = process.env.PHASE || 'local';
Object.assign(process.env, phaseConfigs[currentPhase]);

const sentryWebpackPluginOptions = {};

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
