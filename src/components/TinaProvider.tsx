"use client";

import { useTina } from "tinacms/dist/react";
import type { LandingQuery } from "../../tina/__generated__/types";

interface TinaProviderProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: LandingQuery;
  children: (data: LandingQuery) => React.ReactNode;
}

/**
 * TinaProvider wraps useTina hook for visual editing.
 * This component only loads in edit mode when accessed via /admin.
 */
export function TinaProvider({ query, variables, data, children }: TinaProviderProps) {
  const { data: tinaData } = useTina({
    query,
    variables,
    data,
  });

  return <>{children(tinaData)}</>;
}
