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

    const filePath = getBlockFilePath(blockId);
    if (!filePath) {
      return NextResponse.json(
        { error: "Archivo de bloque no encontrado" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { source } = body;

    if (!source || typeof source !== "string") {
      return NextResponse.json(
        { error: "Codigo fuente requerido" },
        { status: 400 }
      );
    }

    // Write the source file
    try {
      await fs.writeFile(filePath, source, "utf-8");
    } catch (error) {
      console.error("Error writing file:", error);
      return NextResponse.json(
        { error: "No se pudo escribir el archivo" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Bloque guardado correctamente",
    });
  } catch (error) {
    console.error("Error saving block:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
