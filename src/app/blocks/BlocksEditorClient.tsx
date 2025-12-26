"use client";

import { useState, useCallback } from "react";
import { blocks, getBlocksByCategory, categoryLabels, type BlockInfo, type BlockCategory } from "@/lib/block-gallery";
import { BlockTree } from "./components/BlockTree";
import { BlockPreview } from "./components/BlockPreview";
import { CodeEditor } from "./components/CodeEditor";
import styles from "./BlocksEditor.module.css";

export type ViewportSize = "desktop" | "tablet" | "mobile";

export interface EditorState {
  source: string;
  previewData: Record<string, unknown>;
  isDirty: boolean;
  isLoading: boolean;
  error: string | null;
}

export function BlocksEditorClient() {
  const [selectedBlock, setSelectedBlock] = useState<BlockInfo | null>(null);
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [editorState, setEditorState] = useState<EditorState>({
    source: "",
    previewData: {},
    isDirty: false,
    isLoading: false,
    error: null,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const blocksByCategory = getBlocksByCategory();

  // Filter blocks by search query
  const filteredBlocksByCategory = Object.entries(blocksByCategory).reduce(
    (acc, [category, categoryBlocks]) => {
      const filtered = categoryBlocks.filter(
        (block) =>
          block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          block.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category as BlockCategory] = filtered;
      }
      return acc;
    },
    {} as Record<BlockCategory, BlockInfo[]>
  );

  const handleSelectBlock = useCallback(async (block: BlockInfo) => {
    setSelectedBlock(block);
    setEditorState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(`/api/blocks/${block.id}`);
      if (!response.ok) {
        throw new Error("Error al cargar el bloque");
      }
      const data = await response.json();
      setEditorState({
        source: data.source || "",
        previewData: data.previewData || {},
        isDirty: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setEditorState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }));
    }
  }, []);

  const handleSourceChange = useCallback((newSource: string) => {
    setEditorState((prev) => ({
      ...prev,
      source: newSource,
      isDirty: true,
    }));
  }, []);

  const handlePreviewDataChange = useCallback((newData: Record<string, unknown>) => {
    setEditorState((prev) => ({
      ...prev,
      previewData: newData,
      isDirty: true,
    }));
  }, []);

  const handleSave = useCallback(async () => {
    if (!selectedBlock) return;

    setEditorState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`/api/blocks/${selectedBlock.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: editorState.source,
          previewData: editorState.previewData,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al guardar");
      }

      setEditorState((prev) => ({
        ...prev,
        isDirty: false,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setEditorState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Error al guardar",
      }));
    }
  }, [selectedBlock, editorState.source, editorState.previewData]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Blocks Editor</h1>
        <div className={styles.headerActions}>
          {selectedBlock && (
            <>
              <span className={styles.blockName}>{selectedBlock.name}</span>
              {editorState.isDirty && (
                <span className={styles.dirtyIndicator}>Sin guardar</span>
              )}
              <button
                className={styles.saveButton}
                onClick={handleSave}
                disabled={!editorState.isDirty || editorState.isLoading}
              >
                {editorState.isLoading ? "Guardando..." : "Guardar"}
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.main}>
        {/* Left Panel - Tree View */}
        <aside className={styles.sidebar}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Buscar bloques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <BlockTree
            blocksByCategory={filteredBlocksByCategory}
            categoryLabels={categoryLabels}
            selectedBlock={selectedBlock}
            onSelectBlock={handleSelectBlock}
          />
        </aside>

        {/* Center Panel - Preview */}
        <main className={styles.preview}>
          {selectedBlock ? (
            <BlockPreview
              block={selectedBlock}
              previewData={editorState.previewData}
              viewport={viewport}
              onViewportChange={setViewport}
              isLoading={editorState.isLoading}
            />
          ) : (
            <div className={styles.emptyState}>
              <p>Selecciona un bloque del panel izquierdo</p>
            </div>
          )}
        </main>

        {/* Right Panel - Code Editor */}
        <aside className={styles.editor}>
          {selectedBlock ? (
            <CodeEditor
              source={editorState.source}
              previewData={editorState.previewData}
              onSourceChange={handleSourceChange}
              onPreviewDataChange={handlePreviewDataChange}
              onSave={handleSave}
              isLoading={editorState.isLoading}
              error={editorState.error}
            />
          ) : (
            <div className={styles.emptyState}>
              <p>Editor de codigo</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
