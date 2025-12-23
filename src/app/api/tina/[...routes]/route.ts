import { NextRequest } from "next/server";
import databaseClient from "../../../../../tina/__generated__/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { query, variables } = await request.json();

  const result = await databaseClient.queries.page({
    relativePath: variables?.relativePath || "home.json",
  });

  // For GraphQL queries, we need to handle them properly
  if (query) {
    try {
      const data = await (databaseClient.request as any)({
        query,
        variables,
      });
      return new Response(JSON.stringify({ data }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Tina API error:", error);
      return new Response(JSON.stringify({ data: result.data }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response(JSON.stringify({ data: result.data }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET() {
  return new Response(JSON.stringify({ message: "Tina API is running" }), {
    headers: { "Content-Type": "application/json" },
  });
}
