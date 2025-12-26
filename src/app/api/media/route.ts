import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const IMAGES_DIR = path.join(process.cwd(), "public/images");

interface MediaItem {
  filename: string;
  src: string;
  type: string;
  size?: number;
}

async function scanDirectory(dir: string, basePath: string = "/images"): Promise<MediaItem[]> {
  const items: MediaItem[] = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = `${basePath}/${entry.name}`;

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const subItems = await scanDirectory(fullPath, relativePath);
        items.push(...subItems);
      } else if (entry.isFile()) {
        // Check if it's an image
        const ext = path.extname(entry.name).toLowerCase();
        const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

        if (imageExtensions.includes(ext)) {
          const stats = await fs.stat(fullPath);
          items.push({
            filename: entry.name,
            src: relativePath,
            type: ext.slice(1),
            size: stats.size,
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }

  return items;
}

export async function GET() {
  try {
    // Ensure images directory exists
    try {
      await fs.access(IMAGES_DIR);
    } catch {
      await fs.mkdir(IMAGES_DIR, { recursive: true });
    }

    const images = await scanDirectory(IMAGES_DIR);

    // Sort by filename
    images.sort((a, b) => a.filename.localeCompare(b.filename));

    return NextResponse.json({
      images,
      total: images.length,
    });
  } catch (error) {
    console.error("Error listing media:", error);
    return NextResponse.json(
      { error: "Error al listar imagenes" },
      { status: 500 }
    );
  }
}
