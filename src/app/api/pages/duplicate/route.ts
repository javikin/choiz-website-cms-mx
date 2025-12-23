import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const PAGES_DIR = path.join(process.cwd(), "content/pages");

/**
 * Generate a unique slug for a variant
 * Example: "black-friday" -> "black-friday-v2", "black-friday-v3", etc.
 */
async function generateUniqueSlug(baseSlug: string): Promise<string> {
  const files = await fs.readdir(PAGES_DIR);
  const existingSlugs = files
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));

  // Find existing variants
  const variantPattern = new RegExp(`^${baseSlug}(-v(\\d+))?$`);
  const variants = existingSlugs.filter((slug) => variantPattern.test(slug));

  if (variants.length === 0) {
    // Original doesn't exist, use base slug
    return baseSlug;
  }

  // Find the highest variant number
  let maxVariant = 1;
  for (const variant of variants) {
    const match = variant.match(/-v(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= maxVariant) {
        maxVariant = num + 1;
      }
    } else {
      // This is the original (no -vN suffix), so start with v2
      maxVariant = Math.max(maxVariant, 2);
    }
  }

  return `${baseSlug}-v${maxVariant}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceSlug } = body;

    if (!sourceSlug) {
      return NextResponse.json(
        { error: "sourceSlug es requerido" },
        { status: 400 }
      );
    }

    // Read source file
    const sourcePath = path.join(PAGES_DIR, `${sourceSlug}.json`);

    try {
      await fs.access(sourcePath);
    } catch {
      return NextResponse.json(
        { error: `Pagina "${sourceSlug}" no encontrada` },
        { status: 404 }
      );
    }

    const sourceContent = await fs.readFile(sourcePath, "utf-8");
    const sourceData = JSON.parse(sourceContent);

    // Generate unique slug for the variant
    const newSlug = await generateUniqueSlug(sourceSlug);

    // Update title and SEO for the variant
    const newData = {
      ...sourceData,
      title: `${sourceData.title} (Variante)`,
      status: "draft", // New variants start as draft
      seo: {
        ...sourceData.seo,
        metaTitle: sourceData.seo?.metaTitle
          ? `${sourceData.seo.metaTitle} - Variante`
          : undefined,
        noIndex: true, // Don't index variants by default
      },
    };

    // Write new file
    const newPath = path.join(PAGES_DIR, `${newSlug}.json`);
    await fs.writeFile(newPath, JSON.stringify(newData, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: `Variante creada exitosamente`,
      data: {
        sourceSlug,
        newSlug,
        newPath: `/content/pages/${newSlug}.json`,
        editUrl: `/admin/index.html#/collections/page/${newSlug}`,
      },
    });
  } catch (error) {
    console.error("Error duplicating page:", error);
    return NextResponse.json(
      { error: "Error al duplicar la pagina" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "API de duplicacion de paginas",
    usage: "POST /api/pages/duplicate con { sourceSlug: 'nombre-pagina' }",
  });
}
