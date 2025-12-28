"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamic imports for all block components
const blockComponents: Record<string, React.ComponentType<Record<string, unknown>>> = {
  hero: dynamic(() => import("@/components/sections/Hero").then(m => m.Hero)),
  heroVideo: dynamic(() => import("@/components/sections/HeroVideo").then(m => m.HeroVideo)),
  testimonials: dynamic(() => import("@/components/sections/Testimonials").then(m => m.Testimonials)),
  videoTestimonials: dynamic(() => import("@/components/sections/VideoTestimonials").then(m => m.VideoTestimonials)),
  successStories: dynamic(() => import("@/components/sections/SuccessStories").then(m => m.SuccessStories)),
  beforeAfter: dynamic(() => import("@/components/sections/BeforeAfter").then(m => m.BeforeAfter)),
  reviews: dynamic(() => import("@/components/sections/Reviews").then(m => m.Reviews)),
  certifications: dynamic(() => import("@/components/sections/Certifications").then(m => m.Certifications)),
  pressLogos: dynamic(() => import("@/components/sections/PressLogos").then(m => m.PressLogos)),
  stats: dynamic(() => import("@/components/sections/Stats").then(m => m.Stats)),
  guarantee: dynamic(() => import("@/components/sections/Guarantee").then(m => m.Guarantee)),
  guaranteeNew: dynamic(() => import("@/components/sections/GuaranteeNew").then(m => m.GuaranteeNew)),
  effectiveness: dynamic(() => import("@/components/sections/Effectiveness").then(m => m.Effectiveness)),
  products: dynamic(() => import("@/components/sections/Products").then(m => m.Products)),
  productComparison: dynamic(() => import("@/components/sections/ProductComparison").then(m => m.ProductComparison)),
  formulas: dynamic(() => import("@/components/sections/Formulas").then(m => m.Formulas)),
  activos: dynamic(() => import("@/components/sections/Activos").then(m => m.Activos)),
  ingredients: dynamic(() => import("@/components/sections/Ingredients").then(m => m.Ingredients)),
  problem: dynamic(() => import("@/components/sections/Problem").then(m => m.Problem)),
  whyChoose: dynamic(() => import("@/components/sections/WhyChoose").then(m => m.WhyChoose)),
  benefits: dynamic(() => import("@/components/sections/Benefits").then(m => m.Benefits)),
  howItWorks: dynamic(() => import("@/components/sections/HowItWorks").then(m => m.HowItWorks)),
  howItWorksNew: dynamic(() => import("@/components/sections/HowItWorksNew").then(m => m.HowItWorksNew)),
  faq: dynamic(() => import("@/components/sections/FAQ").then(m => m.FAQ)),
  finalCta: dynamic(() => import("@/components/sections/FinalCta").then(m => m.FinalCta)),
  finalCtaNew: dynamic(() => import("@/components/sections/FinalCtaNew").then(m => m.FinalCtaNew)),
  ctaTimer: dynamic(() => import("@/components/sections/CtaTimer").then(m => m.CtaTimer)),
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
