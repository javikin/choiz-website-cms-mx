"use client";

import { useState } from "react";
import type { BlockInfo, BlockCategory } from "@/lib/block-gallery";
import styles from "./BlockTree.module.css";

interface BlockTreeProps {
  blocksByCategory: Record<BlockCategory, BlockInfo[]>;
  categoryLabels: Record<BlockCategory, string>;
  selectedBlock: BlockInfo | null;
  onSelectBlock: (block: BlockInfo) => void;
}

export function BlockTree({
  blocksByCategory,
  categoryLabels,
  selectedBlock,
  onSelectBlock,
}: BlockTreeProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(Object.keys(blocksByCategory))
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return (
    <div className={styles.tree}>
      {Object.entries(blocksByCategory).map(([category, categoryBlocks]) => (
        <div key={category} className={styles.category}>
          <button
            className={styles.categoryHeader}
            onClick={() => toggleCategory(category)}
          >
            <span className={styles.expandIcon}>
              {expandedCategories.has(category) ? "▼" : "▶"}
            </span>
            <span className={styles.categoryName}>
              {categoryLabels[category as BlockCategory]}
            </span>
            <span className={styles.categoryCount}>{categoryBlocks.length}</span>
          </button>

          {expandedCategories.has(category) && (
            <div className={styles.blockList}>
              {categoryBlocks.map((block) => (
                <button
                  key={block.id}
                  className={`${styles.blockItem} ${
                    selectedBlock?.id === block.id ? styles.selected : ""
                  }`}
                  onClick={() => onSelectBlock(block)}
                >
                  <span className={styles.blockIcon}>📦</span>
                  <span className={styles.blockName}>{block.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
