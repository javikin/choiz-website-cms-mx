import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const PAGES_DIR = path.join(process.cwd(), "content/pages");

interface PageData {
  title: string;
  sections: SectionData[];
  [key: string]: unknown;
}

interface SectionData {
  _template: string;
  [key: string]: unknown;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const filePath = path.join(PAGES_DIR, `${slug}.json`);

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { success: false, error: "Pagina no encontrada" },
        { status: 404 }
      );
    }

    const content = await fs.readFile(filePath, "utf-8");
    const data: PageData = JSON.parse(content);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error reading page:", error);
    return NextResponse.json(
      { success: false, error: "Error al leer pagina" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const filePath = path.join(PAGES_DIR, `${slug}.json`);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { success: false, error: "Pagina no encontrada" },
        { status: 404 }
      );
    }

    const body: PageData = await request.json();

    // Validate required fields
    if (!body.title || !Array.isArray(body.sections)) {
      return NextResponse.json(
        { success: false, error: "Datos invalidos: se requiere title y sections" },
        { status: 400 }
      );
    }

    // Write the updated content
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Pagina actualizada correctamente",
    });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar pagina" },
      { status: 500 }
    );
  }
}
