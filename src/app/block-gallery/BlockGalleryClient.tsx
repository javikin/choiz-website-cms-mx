"use client";

import { useState, useMemo, useEffect, Suspense, lazy } from "react";
import {
  blocks,
  getBlocksByCategory,
  categoryLabels,
  categoryDescriptions,
  type BlockCategory,
  type BlockInfo,
} from "@/lib/block-gallery";
import { getPreviewData } from "@/lib/block-preview-data";
import styles from "./BlockGallery.module.css";

// Lazy load all section components for previews
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

interface BlockUsageData {
  blockId: string;
  pages: { slug: string; title: string; sectionIndex: number }[];
  totalUsage: number;
}

type ViewMode = "grid" | "list" | "preview";

export function BlockGalleryClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<BlockCategory | "all">("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);
  const [blockUsage, setBlockUsage] = useState<Record<string, BlockUsageData>>({});
  const [showOnlyUsed, setShowOnlyUsed] = useState(false);
  const [showOnlyUnused, setShowOnlyUnused] = useState(false);

  const blocksByCategory = useMemo(() => getBlocksByCategory(), []);
  const categories = Object.keys(categoryLabels) as BlockCategory[];

  // Fetch block usage data
  useEffect(() => {
    fetch("/api/blocks/usage")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const usageMap: Record<string, BlockUsageData> = {};
          data.data.forEach((item: BlockUsageData) => {
            usageMap[item.blockId] = item;
          });
          setBlockUsage(usageMap);
        }
      })
      .catch(console.error);
  }, []);

  const filteredBlocks = useMemo(() => {
    let result = blocks;

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((block) => block.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (block) =>
          block.name.toLowerCase().includes(query) ||
          block.description.toLowerCase().includes(query) ||
          block.id.toLowerCase().includes(query)
      );
    }

    // Filter by usage
    if (showOnlyUsed) {
      result = result.filter((block) => blockUsage[block.id]?.totalUsage > 0);
    }
    if (showOnlyUnused) {
      result = result.filter((block) => !blockUsage[block.id] || blockUsage[block.id].totalUsage === 0);
    }

    return result;
  }, [selectedCategory, searchQuery, showOnlyUsed, showOnlyUnused, blockUsage]);

  const usedBlocksCount = useMemo(() => {
    return blocks.filter((b) => blockUsage[b.id]?.totalUsage > 0).length;
  }, [blockUsage]);

  const unusedBlocksCount = blocks.length - usedBlocksCount;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Galeria de Bloques</h1>
        <p className={styles.subtitle}>
          {blocks.length} bloques disponibles · {usedBlocksCount} en uso · {unusedBlocksCount} sin usar
        </p>
      </header>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        {/* View Mode Toggle */}
        <div className={styles.viewToggle}>
          <button
            onClick={() => setViewMode("grid")}
            className={`${styles.viewBtn} ${viewMode === "grid" ? styles.viewBtnActive : ""}`}
            title="Vista en cuadricula"
          >
            ▦
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`${styles.viewBtn} ${viewMode === "list" ? styles.viewBtnActive : ""}`}
            title="Vista en lista"
          >
            ☰
          </button>
          <button
            onClick={() => setViewMode("preview")}
            className={`${styles.viewBtn} ${viewMode === "preview" ? styles.viewBtnActive : ""}`}
            title="Vista preview en vivo"
          >
            ◉
          </button>
        </div>

        {/* Quick Filters */}
        <div className={styles.quickFilters}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={showOnlyUsed}
              onChange={(e) => {
                setShowOnlyUsed(e.target.checked);
                if (e.target.checked) setShowOnlyUnused(false);
              }}
            />
            Solo en uso ({usedBlocksCount})
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={showOnlyUnused}
              onChange={(e) => {
                setShowOnlyUnused(e.target.checked);
                if (e.target.checked) setShowOnlyUsed(false);
              }}
            />
            Sin usar ({unusedBlocksCount})
          </label>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {/* Search */}
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Buscar bloques..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className={styles.clearSearch}
              aria-label="Limpiar busqueda"
            >
              ×
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className={styles.categoryPills}>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`${styles.pill} ${selectedCategory === "all" ? styles.pillActive : ""}`}
          >
            Todos ({blocks.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${styles.pill} ${selectedCategory === category ? styles.pillActive : ""}`}
            >
              {categoryLabels[category]} ({blocksByCategory[category].length})
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {(searchQuery || selectedCategory !== "all" || showOnlyUsed || showOnlyUnused) && (
        <div className={styles.resultsCount}>
          {filteredBlocks.length} bloque{filteredBlocks.length !== 1 ? "s" : ""} encontrado
          {filteredBlocks.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* Block Grid/List */}
      {viewMode === "preview" ? (
        <div className={styles.previewMode}>
          {filteredBlocks.map((block) => (
            <LivePreviewSection key={block.id} block={block} usage={blockUsage[block.id]} />
          ))}
        </div>
      ) : viewMode === "list" ? (
        <div className={styles.listMode}>
          {filteredBlocks.map((block) => (
            <BlockListItem
              key={block.id}
              block={block}
              usage={blockUsage[block.id]}
              isExpanded={expandedBlock === block.id}
              onToggle={() => setExpandedBlock(expandedBlock === block.id ? null : block.id)}
            />
          ))}
        </div>
      ) : selectedCategory === "all" && !searchQuery.trim() && !showOnlyUsed && !showOnlyUnused ? (
        // Grouped by category
        <div className={styles.sections}>
          {categories.map((category) => {
            const categoryBlocks = blocksByCategory[category];
            if (categoryBlocks.length === 0) return null;
            return (
              <section key={category} className={styles.categorySection}>
                <div className={styles.categoryHeader}>
                  <h2 className={styles.categoryTitle}>{categoryLabels[category]}</h2>
                  <p className={styles.categoryDescription}>{categoryDescriptions[category]}</p>
                </div>
                <div className={styles.grid}>
                  {categoryBlocks.map((block) => (
                    <BlockCard key={block.id} block={block} usage={blockUsage[block.id]} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        // Flat grid for filtered results
        <div className={styles.grid}>
          {filteredBlocks.length > 0 ? (
            filteredBlocks.map((block) => (
              <BlockCard key={block.id} block={block} usage={blockUsage[block.id]} />
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No se encontraron bloques que coincidan con tu busqueda.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setShowOnlyUsed(false);
                  setShowOnlyUnused(false);
                }}
                className={styles.resetButton}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          Para agregar bloques, ve a{" "}
          <a href="/admin" className={styles.link}>
            TinaCMS Admin
          </a>{" "}
          y edita una landing page.
        </p>
      </footer>
    </div>
  );
}

function BlockCard({ block, usage }: { block: BlockInfo; usage?: BlockUsageData }) {
  const [showPreview, setShowPreview] = useState(false);
  const usageCount = usage?.totalUsage || 0;

  return (
    <div className={`${styles.card} ${usageCount === 0 ? styles.cardUnused : ""}`}>
      {/* Usage Badge */}
      <div className={styles.usageBadge}>
        {usageCount > 0 ? (
          <span className={styles.usedBadge}>{usageCount} uso{usageCount !== 1 ? "s" : ""}</span>
        ) : (
          <span className={styles.unusedBadge}>Sin usar</span>
        )}
      </div>

      {/* Preview */}
      <div className={styles.preview}>
        {showPreview ? (
          <div className={styles.livePreviewSmall}>
            <Suspense fallback={<div className={styles.loading}>Cargando...</div>}>
              <MiniPreview blockId={block.id} />
            </Suspense>
          </div>
        ) : (
          <div className={styles.placeholderPreview} onClick={() => setShowPreview(true)}>
            <span className={styles.placeholderIcon}>👁</span>
            <span className={styles.placeholderText}>Click para preview</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{block.name}</h3>
        <p className={styles.cardDescription}>{block.description}</p>

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

        {/* Usage Info */}
        {usage && usage.pages.length > 0 && (
          <div className={styles.usageInfo}>
            <span className={styles.usageLabel}>Usado en:</span>
            {usage.pages.slice(0, 2).map((page) => (
              <a key={`${page.slug}-${page.sectionIndex}`} href={`/${page.slug}`} className={styles.pageLink}>
                {page.title}
              </a>
            ))}
            {usage.pages.length > 2 && (
              <span className={styles.morePages}>+{usage.pages.length - 2} mas</span>
            )}
          </div>
        )}

        {/* ID Badge */}
        <div className={styles.idBadge}>
          <code>{block.id}</code>
        </div>
      </div>
    </div>
  );
}

function BlockListItem({
  block,
  usage,
  isExpanded,
  onToggle,
}: {
  block: BlockInfo;
  usage?: BlockUsageData;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const usageCount = usage?.totalUsage || 0;

  return (
    <div className={`${styles.listItem} ${usageCount === 0 ? styles.listItemUnused : ""}`}>
      <div className={styles.listItemHeader} onClick={onToggle}>
        <div className={styles.listItemLeft}>
          <span className={styles.listItemIcon}>{isExpanded ? "▼" : "▶"}</span>
          <span className={styles.listItemName}>{block.name}</span>
          <code className={styles.listItemId}>{block.id}</code>
        </div>
        <div className={styles.listItemRight}>
          <span className={styles.listItemCategory}>{categoryLabels[block.category]}</span>
          {usageCount > 0 ? (
            <span className={styles.usedBadge}>{usageCount} uso{usageCount !== 1 ? "s" : ""}</span>
          ) : (
            <span className={styles.unusedBadge}>Sin usar</span>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className={styles.listItemExpanded}>
          <p className={styles.listItemDesc}>{block.description}</p>
          {block.variants && (
            <div className={styles.variants}>
              <span className={styles.variantsLabel}>Variantes:</span>
              {block.variants.map((v) => (
                <span key={v} className={styles.variantTag}>{v}</span>
              ))}
            </div>
          )}
          {usage && usage.pages.length > 0 && (
            <div className={styles.usageDetail}>
              <strong>Paginas que lo usan:</strong>
              <ul>
                {usage.pages.map((page) => (
                  <li key={`${page.slug}-${page.sectionIndex}`}>
                    <a href={`/${page.slug}`}>{page.title}</a> (seccion #{page.sectionIndex + 1})
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={styles.listItemPreview}>
            <Suspense fallback={<div className={styles.loading}>Cargando preview...</div>}>
              <MiniPreview blockId={block.id} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

function LivePreviewSection({ block, usage }: { block: BlockInfo; usage?: BlockUsageData }) {
  const usageCount = usage?.totalUsage || 0;

  return (
    <div className={styles.livePreviewSection}>
      <div className={styles.livePreviewHeader}>
        <div>
          <h3 className={styles.livePreviewTitle}>{block.name}</h3>
          <p className={styles.livePreviewDesc}>{block.description}</p>
        </div>
        <div className={styles.livePreviewMeta}>
          <code>{block.id}</code>
          {usageCount > 0 ? (
            <span className={styles.usedBadge}>{usageCount} uso{usageCount !== 1 ? "s" : ""}</span>
          ) : (
            <span className={styles.unusedBadge}>Sin usar</span>
          )}
        </div>
      </div>
      <div className={styles.livePreviewContainer}>
        <Suspense fallback={<div className={styles.loading}>Cargando componente...</div>}>
          <FullPreview blockId={block.id} />
        </Suspense>
      </div>
    </div>
  );
}

function MiniPreview({ blockId }: { blockId: string }) {
  const Component = componentMap[blockId];
  const previewData = getPreviewData(blockId);

  if (!Component) {
    return <div className={styles.noPreview}>Preview no disponible</div>;
  }

  return (
    <div className={styles.miniPreviewWrapper}>
      <Component {...previewData} />
    </div>
  );
}

function FullPreview({ blockId }: { blockId: string }) {
  const Component = componentMap[blockId];
  const previewData = getPreviewData(blockId);

  if (!Component) {
    return <div className={styles.noPreview}>Preview no disponible para {blockId}</div>;
  }

  return (
    <div className={styles.fullPreviewWrapper}>
      <Component {...previewData} />
    </div>
  );
}
