import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const PAGES_DIR = path.join(process.cwd(), "content/pages");

interface PageInfo {
  slug: string;
  title: string;
  status: string;
  isVariant: boolean;
  baseSlug: string | null;
  variantNumber: number | null;
}

/**
 * Parse slug to extract variant information
 */
function parseSlug(slug: string): {
  isVariant: boolean;
  baseSlug: string | null;
  variantNumber: number | null;
} {
  const match = slug.match(/^(.+)-v(\d+)$/);
  if (match) {
    return {
      isVariant: true,
      baseSlug: match[1],
      variantNumber: parseInt(match[2], 10),
    };
  }
  return {
    isVariant: false,
    baseSlug: null,
    variantNumber: null,
  };
}

export async function GET() {
  try {
    const files = await fs.readdir(PAGES_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));

    const pages: PageInfo[] = await Promise.all(
      jsonFiles.map(async (file) => {
        const slug = file.replace(".json", "");
        const filePath = path.join(PAGES_DIR, file);
        const content = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(content);
        const variantInfo = parseSlug(slug);

        return {
          slug,
          title: data.title || slug,
          status: data.status || "draft",
          ...variantInfo,
        };
      })
    );

    // Group pages by base slug for easier A/B test management
    const grouped: Record<string, PageInfo[]> = {};
    for (const page of pages) {
      const key = page.baseSlug || page.slug;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(page);
    }

    // Sort each group by variant number
    for (const key in grouped) {
      grouped[key].sort((a, b) => {
        if (a.variantNumber === null) return -1;
        if (b.variantNumber === null) return 1;
        return a.variantNumber - b.variantNumber;
      });
    }

    return NextResponse.json({
      pages,
      grouped,
      total: pages.length,
    });
  } catch (error) {
    console.error("Error listing pages:", error);
    return NextResponse.json(
      { error: "Error al listar paginas" },
      { status: 500 }
    );
  }
}
