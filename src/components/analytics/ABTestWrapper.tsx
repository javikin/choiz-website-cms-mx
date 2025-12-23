"use client";

import { useEffect, ReactNode } from "react";

interface ABTestConfig {
  testId?: string;
  variant?: string;
  trafficPercentage?: number;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
}

interface ABTestWrapperProps {
  abTest?: ABTestConfig;
  pageSlug: string;
  children: ReactNode;
}

/**
 * Wrapper component for A/B testing that tracks page views and variant exposure
 * Sends events to Google Analytics 4
 */
export function ABTestWrapper({
  abTest,
  pageSlug,
  children,
}: ABTestWrapperProps) {
  useEffect(() => {
    // Only track if A/B test is configured and active
    if (!abTest?.testId || !abTest?.variant || !abTest?.isActive) {
      return;
    }

    // Check if test is within date range
    const now = new Date();
    if (abTest.startDate && new Date(abTest.startDate) > now) {
      return; // Test hasn't started yet
    }
    if (abTest.endDate && new Date(abTest.endDate) < now) {
      return; // Test has ended
    }

    // Track A/B test view event
    trackABTestEvent("ab_test_view", {
      test_id: abTest.testId,
      variant: abTest.variant,
      page_slug: pageSlug,
      traffic_percentage: abTest.trafficPercentage,
    });
  }, [abTest, pageSlug]);

  return <>{children}</>;
}

/**
 * Track A/B test related events to Google Analytics 4
 */
export function trackABTestEvent(
  eventName: string,
  params: Record<string, string | number | boolean | undefined>
) {
  // Check if gtag is available (GA4)
  if (typeof window !== "undefined" && "gtag" in window) {
    const gtag = (window as unknown as { gtag: Gtag.Gtag }).gtag;
    gtag("event", eventName, {
      ...params,
      event_category: "ab_testing",
    });
  }

  // Also log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[A/B Test Event] ${eventName}:`, params);
  }
}

/**
 * Track conversion events for A/B tests
 * Call this when a user completes a desired action (e.g., clicks CTA, submits form)
 */
export function trackABTestConversion(
  testId: string,
  variant: string,
  conversionType: string,
  value?: number
) {
  trackABTestEvent("ab_test_conversion", {
    test_id: testId,
    variant: variant,
    conversion_type: conversionType,
    conversion_value: value,
  });
}

// Type declaration for gtag
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
