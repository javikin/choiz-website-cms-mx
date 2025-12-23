import { Metadata } from "next";
import { BlockGalleryClient } from "./BlockGalleryClient";

export const metadata: Metadata = {
  title: "Galeria de Bloques | Choiz",
  description: "Explora todos los bloques disponibles para crear landing pages",
  robots: { index: false, follow: false },
};

export default function BlockGalleryPage() {
  return <BlockGalleryClient />;
}
