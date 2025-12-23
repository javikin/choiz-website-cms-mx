import { Metadata } from "next";
import { DevicePreviewClient } from "./DevicePreviewClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Preview: ${slug} | Choiz`,
    description: `Vista previa de la página ${slug} en diferentes dispositivos`,
    robots: { index: false, follow: false },
  };
}

export default async function PreviewPage({ params }: PageProps) {
  const { slug } = await params;
  return <DevicePreviewClient slug={slug} />;
}
