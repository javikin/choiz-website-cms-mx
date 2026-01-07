"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamic imports for active block components (10 blocks)
const blockComponents: Record<string, React.ComponentType<Record<string, unknown>>> = {
  hero: dynamic(() => import("@/components/sections/Hero").then(m => m.Hero)),
  certifications: dynamic(() => import("@/components/sections/Certifications").then(m => m.Certifications)),
  successStories: dynamic(() => import("@/components/sections/SuccessStories").then(m => m.SuccessStories)),
  formulas: dynamic(() => import("@/components/sections/Formulas").then(m => m.Formulas)),
  activos: dynamic(() => import("@/components/sections/Activos").then(m => m.Activos)),
  videoTestimonials: dynamic(() => import("@/components/sections/VideoTestimonials").then(m => m.VideoTestimonials)),
  howItWorksNew: dynamic(() => import("@/components/sections/HowItWorksNew").then(m => m.HowItWorksNew)),
  faq: dynamic(() => import("@/components/sections/FAQ").then(m => m.FAQ)),
  finalCtaNew: dynamic(() => import("@/components/sections/FinalCtaNew").then(m => m.FinalCtaNew)),
  footerNew: dynamic(() => import("@/components/sections/FooterNew").then(m => m.FooterNew)),
};

export default function BlockPreviewPage() {
  const params = useParams();
  const blockId = params.blockId as string;
  const [previewData, setPreviewData] = useState<Record<string, unknown>>({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Listen for preview data updates from parent window
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "UPDATE_PREVIEW_DATA") {
        setPreviewData(event.data.previewData);
        setIsReady(true);
      }
    };

    window.addEventListener("message", handleMessage);

    // Signal to parent that we're ready
    window.parent.postMessage({ type: "PREVIEW_READY" }, "*");

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const BlockComponent = blockComponents[blockId];

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-neutral-600">Cargando preview...</div>
      </div>
    );
  }

  if (!BlockComponent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-red-600">Componente no encontrado: {blockId}</div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <BlockComponent {...previewData} />
    </div>
  );
}
