"use client";

import { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import styles from "./CodeEditor.module.css";

type EditorTab = "tsx" | "data" | "props";

interface CodeEditorProps {
  source: string;
  previewData: Record<string, unknown>;
  onSourceChange: (source: string) => void;
  onPreviewDataChange: (data: Record<string, unknown>) => void;
  onSave: () => void;
  isLoading: boolean;
  error: string | null;
}

export function CodeEditor({
  source,
  previewData,
  onSourceChange,
  onPreviewDataChange,
  onSave,
  isLoading,
  error,
}: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>("tsx");
  const [previewDataString, setPreviewDataString] = useState("");

  // Sync previewData to string
  useEffect(() => {
    setPreviewDataString(JSON.stringify(previewData, null, 2));
  }, [previewData]);

  // Handle keyboard shortcut for save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        onSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSave]);

  const handlePreviewDataChange = useCallback(
    (value: string | undefined) => {
      if (!value) return;
      setPreviewDataString(value);
      try {
        const parsed = JSON.parse(value);
        onPreviewDataChange(parsed);
      } catch {
        // Invalid JSON, don't update
      }
    },
    [onPreviewDataChange]
  );

  const tabs: { id: EditorTab; label: string }[] = [
    { id: "tsx", label: "TSX" },
    { id: "data", label: "Preview Data" },
    { id: "props", label: "Props" },
  ];

  return (
    <div className={styles.container}>
      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Error Banner */}
      {error && (
        <div className={styles.error}>
          <span>⚠️ {error}</span>
        </div>
      )}

      {/* Editor Content */}
      <div className={styles.editorContent}>
        {isLoading ? (
          <div className={styles.loading}>Cargando...</div>
        ) : (
          <>
            {activeTab === "tsx" && (
              <Editor
                height="100%"
                language="typescript"
                theme="vs-dark"
                value={source}
                onChange={(value) => onSourceChange(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  tabSize: 2,
                  automaticLayout: true,
                }}
              />
            )}

            {activeTab === "data" && (
              <Editor
                height="100%"
                language="json"
                theme="vs-dark"
                value={previewDataString}
                onChange={handlePreviewDataChange}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  tabSize: 2,
                  automaticLayout: true,
                }}
              />
            )}

            {activeTab === "props" && (
              <div className={styles.propsView}>
                <p className={styles.propsInfo}>
                  Las props se extraen automaticamente del codigo TSX.
                </p>
                <p className={styles.propsHint}>
                  Edita el archivo TSX para modificar la interface de props.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.hint}>Cmd+S para guardar</span>
      </div>
    </div>
  );
}
