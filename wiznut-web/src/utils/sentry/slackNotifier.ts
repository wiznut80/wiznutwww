import * as Sentry from '@sentry/browser';

export const initializeSentry = () => {
  console.info('[Initializing Sentry] 1');
  if (process.env.APP_STAGE !== 'test') {
    console.info('[Initializing Sentry] 2');
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: process.env.NODE_ENV === 'development' ? 1 : 0.1,
      maxBreadcrumbs: 30,
      ignoreErrors: ['Request aborted', 'Network Error'],
      release: process.env.SENTRY_PROJECT_NAME + '@' + process.env.APP_VERSION,
      environment: process.env.APP_STAGE,
    });
    // Sentry.captureMessage('Hello, world!');
  }
}
