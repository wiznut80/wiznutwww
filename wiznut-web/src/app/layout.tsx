"use client";

// import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/styles/globals.css";
import "@/styles/test.css";
import React, {useEffect} from "react";
import {useAnalytics} from '@/hooks/useAnalytics';
import {initializeSentry} from '@/utils/sentry/slackNotifier';
import ErrorBoundary from '@/components/ErrorBoundary';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({subsets: ["latin"]});

// export const metadata: Metadata = {
//   title: "Wiznut",
//   description: "Enjoy everything about Wiznut.",
// };

export default function RootLayout({
                                     children,
                                     analytics,
                                   }: Readonly<{
  children: React.ReactNode;
  analytics: React.ReactNode;
}>) {
  console.info("[layout.tsx] started");
  initializeSentry();
  console.info("After initializeSentry");
  useAnalytics();
  console.info("After useAnalytics");
  return (
      <html lang="en">
      <body className={inter.className}>
      <ErrorBoundary>
        {analytics}
        {children}
        <CookieConsent/>
      </ErrorBoundary>
      </body>
      </html>
  );
}
