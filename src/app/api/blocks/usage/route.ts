import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface BlockUsage {
  blockId: string;
  pages: {
    slug: string;
    title: string;
    sectionIndex: number;
  }[];
  totalUsage: number;
}

export async function GET() {
  try {
    const pagesDir = path.join(process.cwd(), "content/pages");
    const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".json"));

    const blockUsageMap: Record<string, BlockUsage["pages"]> = {};

    for (const file of files) {
      const filePath = path.join(pagesDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const pageData = JSON.parse(content);

      const slug = file.replace(".json", "");
      const title = pageData.title || slug;

      // Check sections for templates
      if (pageData.sections && Array.isArray(pageData.sections)) {
        pageData.sections.forEach(
          (section: { _template?: string }, index: number) => {
            if (section._template) {
              const blockId = section._template;
              if (!blockUsageMap[blockId]) {
                blockUsageMap[blockId] = [];
              }
              blockUsageMap[blockId].push({
                slug,
                title,
                sectionIndex: index,
              });
            }
          }
        );
      }
    }

    // Convert to array format
    const usage: BlockUsage[] = Object.entries(blockUsageMap).map(
      ([blockId, pages]) => ({
        blockId,
        pages,
        totalUsage: pages.length,
      })
    );

    // Sort by usage count descending
    usage.sort((a, b) => b.totalUsage - a.totalUsage);

    return NextResponse.json({
      success: true,
      data: usage,
      totalBlocks: usage.length,
      totalPages: files.length,
    });
  } catch (error) {
    console.error("Error reading block usage:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read block usage" },
      { status: 500 }
    );
  }
}
