"use client";

import {useCallback, useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {gaButtonHandler, initializeGA, reportPageView} from '@/utils/analytics/analyticsHandler';
import useConsentStore from '@/store/useConsentStore';

export const useAnalytics = () => {
  console.info("[useAnalytics] started")
  const consentGiven = useConsentStore(state => state.consentGiven);
  const pathname = usePathname();

  const handleLoad = useCallback(() => {
    gaButtonHandler();
  }, []);

  useEffect(() => {
    console.info("[useAnalytics] Client", consentGiven, process.env.GA_TRACKING_ID);
    if (consentGiven && process.env.GA_TRACKING_ID) {
      initializeGA(process.env.GA_TRACKING_ID);
      reportPageView(pathname);
    }

    const handleRouteChange = (url: string) => {
      if(consentGiven) {
        reportPageView(url);
        gaButtonHandler(); // Call gaButtonHandler on route change
      }
    };

    window.addEventListener('popstate', () => handleRouteChange(window.location.pathname));
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('popstate', () => handleRouteChange(window.location.pathname));
      window.removeEventListener('load', handleLoad);
    };
  }, [consentGiven, pathname, handleLoad]);
};
