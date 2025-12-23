"use client";

import { useState, useMemo } from "react";
import {
  blocks,
  getBlocksByCategory,
  categoryLabels,
  categoryDescriptions,
  type BlockCategory,
  type BlockInfo,
} from "@/lib/block-gallery";
import styles from "./BlockGallery.module.css";

export function BlockGalleryClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    BlockCategory | "all"
  >("all");

  const blocksByCategory = useMemo(() => getBlocksByCategory(), []);
  const categories = Object.keys(categoryLabels) as BlockCategory[];

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

    return result;
  }, [selectedCategory, searchQuery]);

  const groupedBlocks = useMemo(() => {
    if (selectedCategory !== "all" || searchQuery.trim()) {
      return { all: filteredBlocks };
    }
    return blocksByCategory;
  }, [selectedCategory, searchQuery, filteredBlocks, blocksByCategory]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Galeria de Bloques</h1>
        <p className={styles.subtitle}>
          Explora los {blocks.length} bloques disponibles para crear landing
          pages
        </p>
      </header>

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
            className={`${styles.pill} ${
              selectedCategory === "all" ? styles.pillActive : ""
            }`}
          >
            Todos ({blocks.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${styles.pill} ${
                selectedCategory === category ? styles.pillActive : ""
              }`}
            >
              {categoryLabels[category]} ({blocksByCategory[category].length})
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {(searchQuery || selectedCategory !== "all") && (
        <div className={styles.resultsCount}>
          {filteredBlocks.length} bloque
          {filteredBlocks.length !== 1 ? "s" : ""} encontrado
          {filteredBlocks.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* Block Grid */}
      {selectedCategory === "all" && !searchQuery.trim() ? (
        // Grouped by category
        <div className={styles.sections}>
          {categories.map((category) => (
            <section key={category} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>
                  {categoryLabels[category]}
                </h2>
                <p className={styles.categoryDescription}>
                  {categoryDescriptions[category]}
                </p>
              </div>
              <div className={styles.grid}>
                {blocksByCategory[category].map((block) => (
                  <BlockCard key={block.id} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        // Flat grid for filtered results
        <div className={styles.grid}>
          {filteredBlocks.length > 0 ? (
            filteredBlocks.map((block) => (
              <BlockCard key={block.id} block={block} />
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No se encontraron bloques que coincidan con tu busqueda.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
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

function BlockCard({ block }: { block: BlockInfo }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.card}>
      {/* Preview */}
      <div className={styles.preview}>
        {!imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={block.preview}
            alt={`Preview de ${block.name}`}
            className={styles.previewImage}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.placeholderPreview}>
            <span className={styles.placeholderIcon}>🧩</span>
            <span className={styles.placeholderText}>{block.id}</span>
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

        {/* ID Badge */}
        <div className={styles.idBadge}>
          <code>{block.id}</code>
        </div>
      </div>
    </div>
  );
}
