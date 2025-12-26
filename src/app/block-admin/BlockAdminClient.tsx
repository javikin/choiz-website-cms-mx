"use client";

import { useState, useEffect, useCallback, useRef, Suspense, lazy } from "react";
import Link from "next/link";
import { blocks } from "@/lib/block-gallery";
import { getPreviewData } from "@/lib/block-preview-data";
import { EditableOverlay } from "./components/EditableOverlay";
import { TypedPropsEditor } from "./components/TypedPropsEditor";
import { ImagePicker } from "./components/ImagePicker";
import styles from "./BlockAdmin.module.css";

// Types
interface PageData {
  title: string;
  sections: SectionData[];
}

interface SectionData {
  _template: string;
  [key: string]: unknown;
}

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

export function BlockAdminClient() {
  const [pages, setPages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [imagePickerKey, setImagePickerKey] = useState<string | null>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch available pages
  useEffect(() => {
    fetch("/api/pages")
      .then((res) => res.json())
      .then((data) => {
        if (data.pages) {
          const slugs = data.pages.map((p: { slug: string }) => p.slug);
          setPages(slugs);
          if (slugs.length > 0) {
            setSelectedPage(slugs[0]);
          }
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Fetch page data when selected
  useEffect(() => {
    if (!selectedPage) return;

    setLoading(true);
    fetch(`/api/pages/${selectedPage}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPageData(data.data);
          setSelectedSectionIndex(0);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedPage]);

  const selectedSection = pageData?.sections[selectedSectionIndex ?? 0];
  const blockInfo = selectedSection ? blocks.find((b) => b.id === selectedSection._template) : null;

  const updateSectionProp = (key: string, value: unknown) => {
    if (!pageData || selectedSectionIndex === null) return;

    const newSections = [...pageData.sections];
    newSections[selectedSectionIndex] = {
      ...newSections[selectedSectionIndex],
      [key]: value,
    };

    setPageData({ ...pageData, sections: newSections });
    setHasChanges(true);
  };

  const handleSave = useCallback(async () => {
    if (!selectedPage || !pageData || saving) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/pages/${selectedPage}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
      });

      if (res.ok) {
        setHasChanges(false);
        setLastSaved(new Date());
      }
    } catch (err) {
      console.error("Error saving:", err);
    } finally {
      setSaving(false);
    }
  }, [selectedPage, pageData, saving]);

  // Auto-save with debounce
  useEffect(() => {
    if (hasChanges) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      autoSaveTimeoutRef.current = setTimeout(() => {
        handleSave();
      }, 3000); // Auto-save after 3 seconds of inactivity
    }
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [hasChanges, handleSave]);

  // Keyboard shortcut: Cmd/Ctrl + S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/block-gallery" className={styles.backLink}>
            ← Galeria
          </Link>
          <h1 className={styles.title}>Editor Visual</h1>
        </div>
        <div className={styles.headerCenter}>
          <select
            value={selectedPage || ""}
            onChange={(e) => setSelectedPage(e.target.value)}
            className={styles.pageSelect}
          >
            {pages.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.headerRight}>
          {saving && <span className={styles.savingBadge}>Guardando...</span>}
          {!saving && hasChanges && <span className={styles.unsavedBadge}>Sin guardar</span>}
          {!saving && !hasChanges && lastSaved && (
            <span className={styles.savedBadge}>
              Guardado {lastSaved.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className={`${styles.saveBtn} ${!hasChanges || saving ? styles.saveBtnDisabled : ""}`}
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
          <Link href={`/${selectedPage}`} target="_blank" className={styles.previewLink}>
            Ver pagina ↗
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className={styles.main}>
        {/* Left Panel - Section List */}
        <aside className={styles.sectionList}>
          <div className={styles.panelHeader}>
            <h2>Secciones</h2>
            <span className={styles.sectionCount}>{pageData?.sections.length || 0}</span>
          </div>
          <div className={styles.sections}>
            {pageData?.sections.map((section, index) => {
              const info = blocks.find((b) => b.id === section._template);
              return (
                <button
                  key={index}
                  onClick={() => setSelectedSectionIndex(index)}
                  className={`${styles.sectionItem} ${selectedSectionIndex === index ? styles.sectionItemActive : ""}`}
                >
                  <span className={styles.sectionIndex}>{index + 1}</span>
                  <div className={styles.sectionInfo}>
                    <span className={styles.sectionName}>{info?.name || section._template}</span>
                    <span className={styles.sectionTemplate}>{section._template}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <button className={styles.addSectionBtn}>+ Agregar seccion</button>
        </aside>

        {/* Center - Preview */}
        <main className={styles.preview}>
          {loading ? (
            <div className={styles.loading}>Cargando...</div>
          ) : selectedSection ? (
            <div className={styles.previewWrapper}>
              <div className={styles.previewHeader}>
                <span className={styles.previewTitle}>{blockInfo?.name}</span>
                <code className={styles.previewTemplate}>{selectedSection._template}</code>
              </div>
              <div className={styles.previewContent}>
                <Suspense fallback={<div className={styles.loading}>Cargando componente...</div>}>
                  <SectionPreview section={selectedSection} onUpdate={updateSectionProp} />
                </Suspense>
              </div>
            </div>
          ) : (
            <div className={styles.empty}>Selecciona una seccion para editar</div>
          )}
        </main>

        {/* Right Panel - Properties */}
        <aside className={styles.propsPanel}>
          <div className={styles.panelHeader}>
            <h2>Propiedades</h2>
          </div>
          {selectedSection ? (
            <div className={styles.propsContent}>
              <TypedPropsEditor
                section={selectedSection}
                onChange={updateSectionProp}
                onImageSelect={(key) => {
                  setImagePickerKey(key);
                  setShowImagePicker(true);
                }}
              />
            </div>
          ) : (
            <div className={styles.emptyProps}>Selecciona una seccion</div>
          )}
        </aside>
      </div>

      {/* Image Picker Modal */}
      {showImagePicker && imagePickerKey && selectedSection && (
        <ImagePicker
          value={String(selectedSection[imagePickerKey] || "")}
          onChange={(newValue) => {
            updateSectionProp(imagePickerKey, newValue);
            setShowImagePicker(false);
            setImagePickerKey(null);
          }}
          onClose={() => {
            setShowImagePicker(false);
            setImagePickerKey(null);
          }}
        />
      )}
    </div>
  );
}

function SectionPreview({
  section,
  onUpdate,
}: {
  section: SectionData;
  onUpdate: (propPath: string, value: unknown) => void;
}) {
  const Component = componentMap[section._template];

  if (!Component) {
    return <div className={styles.noPreview}>Componente no disponible: {section._template}</div>;
  }

  // Merge section data with preview defaults
  const previewData = getPreviewData(section._template);
  const mergedProps = { ...previewData, ...section };

  return (
    <EditableOverlay sectionData={section} onUpdate={onUpdate}>
      <div className={styles.sectionPreviewWrapper}>
        <Component {...mergedProps} />
      </div>
    </EditableOverlay>
  );
}

