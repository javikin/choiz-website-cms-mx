import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getBlockById } from "@/lib/block-gallery";
import { blockPreviewData } from "@/lib/block-preview-data";

// Map block IDs to file names
const blockFileMap: Record<string, string> = {
  hero: "Hero",
  heroVideo: "HeroVideo",
  testimonials: "Testimonials",
  videoTestimonials: "VideoTestimonials",
  successStories: "SuccessStories",
  beforeAfter: "BeforeAfter",
  reviews: "Reviews",
  certifications: "Certifications",
  pressLogos: "PressLogos",
  stats: "Stats",
  guarantee: "Guarantee",
  guaranteeNew: "GuaranteeNew",
  effectiveness: "Effectiveness",
  products: "Products",
  productComparison: "ProductComparison",
  formulas: "Formulas",
  activos: "Activos",
  ingredients: "Ingredients",
  problem: "Problem",
  whyChoose: "WhyChoose",
  benefits: "Benefits",
  howItWorks: "HowItWorks",
  howItWorksNew: "HowItWorksNew",
  faq: "FAQ",
  finalCta: "FinalCta",
  finalCtaNew: "FinalCtaNew",
  ctaTimer: "CtaTimer",
  footerNew: "FooterNew",
};

function getBlockFilePath(blockId: string): string | null {
  const fileName = blockFileMap[blockId];
  if (!fileName) return null;
  return path.join(process.cwd(), "src", "components", "sections", `${fileName}.tsx`);
}

function getPreviewDataFilePath(): string {
  return path.join(process.cwd(), "src", "lib", "block-preview-data.ts");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ blockId: string }> }
) {
  try {
    const { blockId } = await params;
    const block = getBlockById(blockId);

    if (!block) {
      return NextResponse.json(
        { error: "Bloque no encontrado" },
        { status: 404 }
      );
    }

    const filePath = getBlockFilePath(blockId);
    if (!filePath) {
      return NextResponse.json(
        { error: "Archivo de bloque no encontrado" },
        { status: 404 }
      );
    }

    let source = "";
    try {
      source = await fs.readFile(filePath, "utf-8");
    } catch {
      return NextResponse.json(
        { error: "No se pudo leer el archivo del bloque" },
        { status: 500 }
      );
    }

    const previewData = blockPreviewData[blockId] || {};

    return NextResponse.json({
      id: blockId,
      name: block.name,
      filePath: `src/components/sections/${blockFileMap[blockId]}.tsx`,
      source,
      previewData,
    });
  } catch (error) {
    console.error("Error fetching block:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ blockId: string }> }
) {
  try {
    const { blockId } = await params;
    const block = getBlockById(blockId);

    if (!block) {
      return NextResponse.json(
        { error: "Bloque no encontrado" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { previewData } = body;

    if (!previewData || typeof previewData !== "object") {
      return NextResponse.json(
        { error: "Preview data requerido" },
        { status: 400 }
      );
    }

    // Read current preview data file
    const previewDataPath = getPreviewDataFilePath();
    let fileContent = "";
    try {
      fileContent = await fs.readFile(previewDataPath, "utf-8");
    } catch (error) {
      console.error("Error reading preview data file:", error);
      return NextResponse.json(
        { error: "No se pudo leer el archivo de preview data" },
        { status: 500 }
      );
    }

    // Update the preview data for this block
    // This is a simple find-replace approach
    // In a real app, you might want to use AST parsing
    const blockDataString = `  ${blockId}: ${JSON.stringify(previewData, null, 2).split('\n').join('\n  ')},`;

    // Find and replace the block data
    const blockRegex = new RegExp(
      `  ${blockId}:\\s*{[\\s\\S]*?},(?=\\n\\n|\\n};)`,
      "gm"
    );

    if (!blockRegex.test(fileContent)) {
      return NextResponse.json(
        { error: "Bloque no encontrado en preview data" },
        { status: 404 }
      );
    }

    const updatedContent = fileContent.replace(blockRegex, blockDataString);

    // Write back to file
    try {
      await fs.writeFile(previewDataPath, updatedContent, "utf-8");
    } catch (error) {
      console.error("Error writing preview data file:", error);
      return NextResponse.json(
        { error: "No se pudo guardar el preview data" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Preview data guardado correctamente",
    });
  } catch (error) {
    console.error("Error saving block:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
