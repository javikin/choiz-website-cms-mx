"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

/**
 * Google Analytics 4 component
 * Add this to your layout.tsx to enable analytics across the site
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}

/**
 * Track page views manually (useful for SPA navigation)
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window !== "undefined" && "gtag" in window) {
    const gtag = (window as unknown as { gtag: Gtag.Gtag }).gtag;
    gtag("event", "page_view", {
      page_path: url,
      page_title: title,
    });
  }
}

/**
 * Track custom events
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && "gtag" in window) {
    const gtag = (window as unknown as { gtag: Gtag.Gtag }).gtag;
    gtag("event", eventName, params);
  }
}

// Re-export Gtag type
declare global {
  namespace Gtag {
    interface Gtag {
      (
        command: "event",
        eventName: string,
        eventParams?: Record<string, unknown>
      ): void;
      (command: "config", targetId: string, config?: Record<string, unknown>): void;
      (command: "set", config: Record<string, unknown>): void;
    }
  }
}
