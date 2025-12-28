"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { BlockInfo } from "@/lib/block-gallery";
import type { ViewportSize } from "../BlocksEditorClient";
import styles from "./BlockPreview.module.css";

// Static imports for all block components using next/dynamic
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

const viewportWidths: Record<ViewportSize, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
};

interface BlockPreviewProps {
  block: BlockInfo;
  previewData: Record<string, unknown>;
  viewport: ViewportSize;
  onViewportChange: (viewport: ViewportSize) => void;
  isLoading: boolean;
}

export function BlockPreview({
  block,
  previewData,
  viewport,
  onViewportChange,
  isLoading,
}: BlockPreviewProps) {
  const BlockComponent = blockComponents[block.id];
  const viewportWidth = viewportWidths[viewport];

  return (
    <div className={styles.container}>
      {/* Viewport Controls */}
      <div className={styles.controls}>
        <div className={styles.viewportToggle}>
          {(Object.keys(viewportWidths) as ViewportSize[]).map((size) => (
            <button
              key={size}
              className={`${styles.viewportButton} ${
                viewport === size ? styles.active : ""
              }`}
              onClick={() => onViewportChange(size)}
            >
              {size === "desktop" && "🖥️"}
              {size === "tablet" && "📱"}
              {size === "mobile" && "📲"}
              <span className={styles.viewportLabel}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </span>
            </button>
          ))}
        </div>
        <span className={styles.viewportSize}>{viewportWidth}px</span>
      </div>

      {/* Preview Area */}
      <div className={styles.previewArea}>
        {isLoading ? (
          <div className={styles.loading}>Cargando...</div>
        ) : (
          <div
            className={styles.previewFrame}
            style={{ maxWidth: viewportWidth }}
          >
            <Suspense fallback={<div className={styles.loading}>Cargando componente...</div>}>
              {BlockComponent ? (
                <BlockComponent {...previewData} />
              ) : (
                <div className={styles.error}>
                  Componente no encontrado: {block.id}
                </div>
              )}
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
