import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Map blockId to component file name (PascalCase)
const blockIdToFileName: Record<string, string> = {
  hero: "Hero",
  heroVideo: "HeroVideo",
  certifications: "Certifications",
  testimonials: "Testimonials",
  successStories: "SuccessStories",
  formulas: "Formulas",
  activos: "Activos",
  videoTestimonials: "VideoTestimonials",
  howItWorks: "HowItWorks",
  howItWorksNew: "HowItWorksNew",
  faq: "FAQ",
  finalCta: "FinalCta",
  finalCtaNew: "FinalCtaNew",
  footerNew: "FooterNew",
  stats: "Stats",
  ctaTimer: "CtaTimer",
  pressLogos: "PressLogos",
  productComparison: "ProductComparison",
  beforeAfter: "BeforeAfter",
  benefits: "Benefits",
  guarantee: "Guarantee",
  guaranteeNew: "GuaranteeNew",
  reviews: "Reviews",
  problem: "Problem",
  products: "Products",
  ingredients: "Ingredients",
  effectiveness: "Effectiveness",
  whyChoose: "WhyChoose",
};

interface PropInfo {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
}

function parsePropsFromSource(source: string): PropInfo[] {
  const props: PropInfo[] = [];

  // Find interface definition (e.g., interface HeroProps { ... })
  const interfaceMatch = source.match(
    /interface\s+\w+Props\s*\{([\s\S]+?)\}/
  );

  if (interfaceMatch) {
    const interfaceBody = interfaceMatch[1];
    const propLines = interfaceBody.split("\n");

    for (const line of propLines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("//")) continue;

      // Match prop definition: propName?: Type;
      const propMatch = trimmed.match(
        /^(\w+)(\?)?:\s*([^;]+);?/
      );

      if (propMatch) {
        props.push({
          name: propMatch[1],
          optional: !!propMatch[2],
          type: propMatch[3].trim(),
        });
      }
    }
  }

  // Also try to find default values from the function signature
  const funcMatch = source.match(
    /export\s+function\s+\w+\s*\(\s*\{([\s\S]+?)\}\s*:\s*\w+Props\s*\)/
  );

  if (funcMatch) {
    const paramsBody = funcMatch[1];
    const paramLines = paramsBody.split("\n");

    for (const line of paramLines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Match default value: propName = value,
      const defaultMatch = trimmed.match(
        /^(\w+)\s*=\s*(.+?),?\s*$/
      );

      if (defaultMatch) {
        const propName = defaultMatch[1];
        const defaultValue = defaultMatch[2].trim();

        const existingProp = props.find((p) => p.name === propName);
        if (existingProp) {
          existingProp.defaultValue = defaultValue;
        }
      }
    }
  }

  return props;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const blockId = searchParams.get("blockId");

    if (!blockId) {
      return NextResponse.json(
        { success: false, error: "blockId is required" },
        { status: 400 }
      );
    }

    const fileName = blockIdToFileName[blockId];
    if (!fileName) {
      return NextResponse.json(
        { success: false, error: `Unknown block: ${blockId}` },
        { status: 404 }
      );
    }

    const filePath = path.join(
      process.cwd(),
      "src/components/sections",
      `${fileName}.tsx`
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, error: `File not found: ${fileName}.tsx` },
        { status: 404 }
      );
    }

    const source = fs.readFileSync(filePath, "utf-8");
    const props = parsePropsFromSource(source);

    return NextResponse.json({
      success: true,
      data: {
        blockId,
        fileName: `${fileName}.tsx`,
        source,
        props,
        lineCount: source.split("\n").length,
      },
    });
  } catch (error) {
    console.error("Error reading block source:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read block source" },
      { status: 500 }
    );
  }
}
