"use client";

import * as Sentry from '@sentry/nextjs';
import {NextPageContext} from 'next';

interface ErrorProps {
  statusCode: number;
  hasGetInitialPropsRun?: boolean;
  err?: Error;
}

const MyError = ({statusCode, hasGetInitialPropsRun, err}: ErrorProps) => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return (
      <p>
        {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
      </p>
  );
};

MyError.getInitialProps = async (context: NextPageContext) => {
  const {res, err, asPath} = context;
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  const errorInitialProps: ErrorProps = {statusCode};

  errorInitialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode === 404) {
    return errorInitialProps;
  }

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return errorInitialProps;
  }

  Sentry.captureException(new Error(`_error.js getInitialProps missing data at path: ${asPath}`));
  await Sentry.flush(2000);

  return errorInitialProps;
};

export default MyError;
