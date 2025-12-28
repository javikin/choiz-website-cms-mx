"use client";

import { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import styles from "./CodeEditor.module.css";

type EditorTab = "data" | "tsx" | "props";

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
  const [activeTab, setActiveTab] = useState<EditorTab>("data");
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
    { id: "data", label: "Preview Data" },
    { id: "tsx", label: "TSX (Read-only)" },
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

      {/* Info Banner */}
      {activeTab === "tsx" && (
        <div className={styles.info}>
          <span>
            ℹ️ Código TSX es read-only. Para modificar el componente, edita el archivo directamente en tu IDE.
          </span>
        </div>
      )}

      {activeTab === "data" && (
        <div className={styles.success}>
          <span>
            ✏️ Edita el Preview Data aquí. Los cambios se aplican en tiempo real y persisten al guardar.
          </span>
        </div>
      )}

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
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  tabSize: 2,
                  automaticLayout: true,
                  readOnly: true,
                  domReadOnly: true,
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
                  formatOnPaste: true,
                  formatOnType: true,
                }}
              />
            )}

            {activeTab === "props" && (
              <div className={styles.propsView}>
                <p className={styles.propsInfo}>
                  Las props se extraen automaticamente del codigo TSX.
                </p>
                <p className={styles.propsHint}>
                  Edita el archivo TSX en tu IDE para modificar la interface de props.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        {activeTab === "data" ? (
          <span className={styles.hint}>Cmd+S para guardar cambios en Preview Data</span>
        ) : (
          <span className={styles.hint}>Solo Preview Data es editable</span>
        )}
      </div>
    </div>
  );
}
