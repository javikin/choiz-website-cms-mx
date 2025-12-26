"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { type BlockInfo, categoryLabels, getBlockById } from "@/lib/block-gallery";
import { getPreviewData } from "@/lib/block-preview-data";
import { CodeViewer } from "./CodeViewer";
import { PropsDocumentation } from "./PropsDocumentation";
import styles from "./BlockDetail.module.css";

// Lazy load section components
const componentMap: Record<string, React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>> = {
  hero: lazy(() => import("@/components/sections/Hero").then((m) => ({ default: m.Hero as React.ComponentType<Record<string, unknown>> }))),
  heroVideo: lazy(() => import("@/components/sections/HeroVideo").then((m) => ({ default: m.HeroVideo as React.ComponentType<Record<string, unknown>> }))),
  certifications: lazy(() => import("@/components/sections/Certifications").then((m) => ({ default: m.Certifications as React.ComponentType<Record<string, unknown>> }))),
  testimonials: lazy(() => import("@/components/sections/Testimonials").then((m) => ({ default: m.Testimonials as React.ComponentType<Record<string, unknown>> }))),
  successStories: lazy(() => import("@/components/sections/SuccessStories").then((m) => ({ default: m.SuccessStories as React.ComponentType<Record<string, unknown>> }))),
  formulas: lazy(() => import("@/components/sections/Formulas").then((m) => ({ default: m.Formulas as React.ComponentType<Record<string, unknown>> }))),
  activos: lazy(() => import("@/components/sections/Activos").then((m) => ({ default: m.Activos as React.ComponentType<Record<string, unknown>> }))),
  videoTestimonials: lazy(() => import("@/components/sections/VideoTestimonials").then((m) => ({ default: m.VideoTestimonials as React.ComponentType<Record<string, unknown>> }))),
  howItWorks: lazy(() => import("@/components/sections/HowItWorks").then((m) => ({ default: m.HowItWorks as React.ComponentType<Record<string, unknown>> }))),
  howItWorksNew: lazy(() => import("@/components/sections/HowItWorksNew").then((m) => ({ default: m.HowItWorksNew as React.ComponentType<Record<string, unknown>> }))),
  faq: lazy(() => import("@/components/sections/FAQ").then((m) => ({ default: m.FAQ as React.ComponentType<Record<string, unknown>> }))),
  finalCta: lazy(() => import("@/components/sections/FinalCta").then((m) => ({ default: m.FinalCta as React.ComponentType<Record<string, unknown>> }))),
  finalCtaNew: lazy(() => import("@/components/sections/FinalCtaNew").then((m) => ({ default: m.FinalCtaNew as React.ComponentType<Record<string, unknown>> }))),
  footerNew: lazy(() => import("@/components/sections/FooterNew").then((m) => ({ default: m.FooterNew as React.ComponentType<Record<string, unknown>> }))),
  stats: lazy(() => import("@/components/sections/Stats").then((m) => ({ default: m.Stats as React.ComponentType<Record<string, unknown>> }))),
  ctaTimer: lazy(() => import("@/components/sections/CtaTimer").then((m) => ({ default: m.CtaTimer as React.ComponentType<Record<string, unknown>> }))),
  pressLogos: lazy(() => import("@/components/sections/PressLogos").then((m) => ({ default: m.PressLogos as React.ComponentType<Record<string, unknown>> }))),
  productComparison: lazy(() => import("@/components/sections/ProductComparison").then((m) => ({ default: m.ProductComparison as React.ComponentType<Record<string, unknown>> }))),
  beforeAfter: lazy(() => import("@/components/sections/BeforeAfter").then((m) => ({ default: m.BeforeAfter as React.ComponentType<Record<string, unknown>> }))),
  benefits: lazy(() => import("@/components/sections/Benefits").then((m) => ({ default: m.Benefits as React.ComponentType<Record<string, unknown>> }))),
  guarantee: lazy(() => import("@/components/sections/Guarantee").then((m) => ({ default: m.Guarantee as React.ComponentType<Record<string, unknown>> }))),
  guaranteeNew: lazy(() => import("@/components/sections/GuaranteeNew").then((m) => ({ default: m.GuaranteeNew as React.ComponentType<Record<string, unknown>> }))),
  reviews: lazy(() => import("@/components/sections/Reviews").then((m) => ({ default: m.Reviews as React.ComponentType<Record<string, unknown>> }))),
  problem: lazy(() => import("@/components/sections/Problem").then((m) => ({ default: m.Problem as React.ComponentType<Record<string, unknown>> }))),
  products: lazy(() => import("@/components/sections/Products").then((m) => ({ default: m.Products as React.ComponentType<Record<string, unknown>> }))),
  ingredients: lazy(() => import("@/components/sections/Ingredients").then((m) => ({ default: m.Ingredients as React.ComponentType<Record<string, unknown>> }))),
  effectiveness: lazy(() => import("@/components/sections/Effectiveness").then((m) => ({ default: m.Effectiveness as React.ComponentType<Record<string, unknown>> }))),
  whyChoose: lazy(() => import("@/components/sections/WhyChoose").then((m) => ({ default: m.WhyChoose as React.ComponentType<Record<string, unknown>> }))),
};

type TabType = "preview" | "code" | "props";

interface PropInfo {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
}

interface SourceData {
  blockId: string;
  fileName: string;
  source: string;
  props: PropInfo[];
  lineCount: number;
}

interface BlockDetailProps {
  blockId: string;
  onClose: () => void;
}

export function BlockDetail({ blockId, onClose }: BlockDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>("preview");
  const [sourceData, setSourceData] = useState<SourceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const block = getBlockById(blockId);

  // Fetch source code when code or props tab is selected
  useEffect(() => {
    if ((activeTab === "code" || activeTab === "props") && !sourceData) {
      setLoading(true);
      setError(null);

      fetch(`/api/blocks/source?blockId=${blockId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSourceData(data.data);
          } else {
            setError(data.error || "Error al cargar el codigo");
          }
        })
        .catch((err) => {
          setError("Error de conexion");
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [activeTab, blockId, sourceData]);

  if (!block) {
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.error}>Bloque no encontrado: {blockId}</div>
        </div>
      </div>
    );
  }

  const Component = componentMap[blockId];
  const previewData = getPreviewData(blockId);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <h2 className={styles.title}>{block.name}</h2>
            <div className={styles.meta}>
              <span className={styles.category}>{categoryLabels[block.category]}</span>
              <code className={styles.blockId}>{block.id}</code>
            </div>
          </div>
          <button onClick={onClose} className={styles.closeButton} aria-label="Cerrar">
            <CloseIcon />
          </button>
        </div>

        {/* Description */}
        <p className={styles.description}>{block.description}</p>

        {/* Variants */}
        {block.variants && block.variants.length > 0 && (
          <div className={styles.variants}>
            <span className={styles.variantsLabel}>Variantes:</span>
            {block.variants.map((variant) => (
              <span key={variant} className={styles.variantTag}>
                {variant}
              </span>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab("preview")}
            className={`${styles.tab} ${activeTab === "preview" ? styles.tabActive : ""}`}
          >
            <PreviewIcon /> Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`${styles.tab} ${activeTab === "code" ? styles.tabActive : ""}`}
          >
            <CodeIcon /> Codigo
          </button>
          <button
            onClick={() => setActiveTab("props")}
            className={`${styles.tab} ${activeTab === "props" ? styles.tabActive : ""}`}
          >
            <PropsIcon /> Props
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.content}>
          {activeTab === "preview" && (
            <div className={styles.previewContainer}>
              {Component ? (
                <Suspense fallback={<div className={styles.loading}>Cargando preview...</div>}>
                  <div className={styles.previewWrapper}>
                    <Component {...previewData} />
                  </div>
                </Suspense>
              ) : (
                <div className={styles.noPreview}>Preview no disponible</div>
              )}
            </div>
          )}

          {activeTab === "code" && (
            <div className={styles.codeContainer}>
              {loading ? (
                <div className={styles.loading}>Cargando codigo...</div>
              ) : error ? (
                <div className={styles.error}>{error}</div>
              ) : sourceData ? (
                <CodeViewer
                  code={sourceData.source}
                  fileName={sourceData.fileName}
                  lineCount={sourceData.lineCount}
                />
              ) : null}
            </div>
          )}

          {activeTab === "props" && (
            <div className={styles.propsContainer}>
              {loading ? (
                <div className={styles.loading}>Cargando props...</div>
              ) : error ? (
                <div className={styles.error}>{error}</div>
              ) : sourceData ? (
                <PropsDocumentation
                  props={sourceData.props}
                  blockName={sourceData.fileName.replace(".tsx", "")}
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function PreviewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function PropsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
