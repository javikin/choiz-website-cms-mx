"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ImagePicker } from "./ImagePicker";
import { ButtonEditor } from "./ButtonEditor";
import styles from "./EditableOverlay.module.css";

interface EditableElement {
  element: HTMLElement;
  propPath: string;
  type: "text" | "image" | "button";
  rect: DOMRect;
}

interface EditableOverlayProps {
  children: React.ReactNode;
  sectionData: Record<string, unknown>;
  onUpdate: (propPath: string, value: unknown) => void;
}

export function EditableOverlay({ children, sectionData, onUpdate }: EditableOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editables, setEditables] = useState<EditableElement[]>([]);
  const [activeEdit, setActiveEdit] = useState<EditableElement | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [activeImagePath, setActiveImagePath] = useState<string | null>(null);
  const [showButtonEditor, setShowButtonEditor] = useState(false);
  const [activeButtonPath, setActiveButtonPath] = useState<string | null>(null);

  // Find editable elements in the rendered preview
  const scanForEditables = useCallback(() => {
    if (!containerRef.current) return;

    const found: EditableElement[] = [];
    const container = containerRef.current;

    // Find text elements with data-editable attribute
    const textElements = container.querySelectorAll("[data-editable]");
    textElements.forEach((el) => {
      const element = el as HTMLElement;
      const propPath = element.dataset.editable || "";
      if (propPath) {
        found.push({
          element,
          propPath,
          type: "text",
          rect: element.getBoundingClientRect(),
        });
      }
    });

    // Find headings and paragraphs that might be editable
    const textNodes = container.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span.editable, [class*='headline'], [class*='title'], [class*='subtitle']");
    textNodes.forEach((el) => {
      const element = el as HTMLElement;
      // Skip if already has data-editable or is inside an editable element
      if (element.dataset.editable || element.closest("[data-editable]")) return;
      // Skip if element has no text content or only contains other elements
      if (!element.textContent?.trim() || element.children.length > 3) return;

      // Try to infer prop path from class or id
      const inferredPath = inferPropPath(element, sectionData);
      if (inferredPath) {
        found.push({
          element,
          propPath: inferredPath,
          type: "text",
          rect: element.getBoundingClientRect(),
        });
      }
    });

    // Find images
    const images = container.querySelectorAll("img[src]");
    images.forEach((el) => {
      const element = el as HTMLImageElement;
      const propPath = element.dataset.editable || inferImagePath(element, sectionData);
      if (propPath) {
        found.push({
          element,
          propPath,
          type: "image",
          rect: element.getBoundingClientRect(),
        });
      }
    });

    // Find buttons/CTAs
    const buttons = container.querySelectorAll("button, a[class*='cta'], a[class*='btn'], [class*='button']");
    buttons.forEach((el) => {
      const element = el as HTMLElement;
      const propPath = element.dataset.editable || inferButtonPath(element, sectionData);
      if (propPath) {
        found.push({
          element,
          propPath,
          type: "button",
          rect: element.getBoundingClientRect(),
        });
      }
    });

    setEditables(found);
  }, [sectionData]);

  useEffect(() => {
    // Scan after render
    const timer = setTimeout(scanForEditables, 100);
    return () => clearTimeout(timer);
  }, [scanForEditables, children]);

  // Rescan on window resize
  useEffect(() => {
    const handleResize = () => {
      scanForEditables();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scanForEditables]);

  const handleElementClick = (editable: EditableElement) => {
    if (editable.type === "text") {
      const currentValue = getValueByPath(sectionData, editable.propPath);
      setEditValue(String(currentValue || ""));
      setActiveEdit(editable);
    } else if (editable.type === "image") {
      setActiveImagePath(editable.propPath);
      setShowImagePicker(true);
    } else if (editable.type === "button") {
      setActiveButtonPath(editable.propPath);
      setShowButtonEditor(true);
    }
  };

  const handleImageSelect = (imageSrc: string) => {
    if (activeImagePath) {
      onUpdate(activeImagePath, imageSrc);
      setActiveImagePath(null);
    }
  };

  const handleButtonSave = (data: { text: string; link: string; variant?: string }) => {
    if (activeButtonPath) {
      // Update button text
      onUpdate(activeButtonPath, data.text);
      // Try to find and update the link field
      const linkPath = activeButtonPath.replace("Text", "Link");
      if (linkPath !== activeButtonPath) {
        onUpdate(linkPath, data.link);
      }
    }
  };

  const handleSave = () => {
    if (activeEdit) {
      onUpdate(activeEdit.propPath, editValue);
      setActiveEdit(null);
    }
  };

  const handleCancel = () => {
    setActiveEdit(null);
  };

  const containerRect = containerRef.current?.getBoundingClientRect();

  return (
    <div className={styles.container} ref={containerRef}>
      {children}

      {/* Editable highlights */}
      {editables.map((editable, index) => {
        if (!containerRect) return null;
        const relativeRect = {
          top: editable.rect.top - containerRect.top,
          left: editable.rect.left - containerRect.left,
          width: editable.rect.width,
          height: editable.rect.height,
        };

        return (
          <div
            key={`${editable.propPath}-${index}`}
            className={`${styles.highlight} ${styles[editable.type]}`}
            style={{
              top: relativeRect.top,
              left: relativeRect.left,
              width: relativeRect.width,
              height: relativeRect.height,
            }}
            onClick={() => handleElementClick(editable)}
            title={`Editar: ${editable.propPath}`}
          >
            <span className={styles.label}>{editable.propPath}</span>
          </div>
        );
      })}

      {/* Inline text editor */}
      {activeEdit && containerRect && (
        <div
          className={styles.inlineEditor}
          style={{
            top: activeEdit.rect.top - containerRect.top,
            left: activeEdit.rect.left - containerRect.left,
            width: Math.max(activeEdit.rect.width, 200),
          }}
        >
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancel();
              if ((e.metaKey || e.ctrlKey) && e.key === "s") {
                e.preventDefault();
                handleSave();
              }
            }}
          />
          <div className={styles.editorActions}>
            <button onClick={handleCancel} className={styles.cancelBtn}>
              Cancelar
            </button>
            <button onClick={handleSave} className={styles.saveBtn}>
              Guardar
            </button>
          </div>
        </div>
      )}

      {/* Image picker modal */}
      {showImagePicker && activeImagePath && (
        <ImagePicker
          value={String(getValueByPath(sectionData, activeImagePath) || "")}
          onChange={handleImageSelect}
          onClose={() => {
            setShowImagePicker(false);
            setActiveImagePath(null);
          }}
        />
      )}

      {/* Button editor modal */}
      {showButtonEditor && activeButtonPath && (
        <ButtonEditor
          textValue={String(getValueByPath(sectionData, activeButtonPath) || "")}
          linkValue={String(getValueByPath(sectionData, activeButtonPath.replace("Text", "Link")) || "")}
          onSave={handleButtonSave}
          onClose={() => {
            setShowButtonEditor(false);
            setActiveButtonPath(null);
          }}
        />
      )}
    </div>
  );
}

// Helper to get nested value by dot path
function getValueByPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc: unknown, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

// Infer prop path from element text content
function inferPropPath(element: HTMLElement, data: Record<string, unknown>): string | null {
  const text = element.textContent?.trim();
  if (!text) return null;

  // Search for matching text in section data
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string" && value === text) {
      return key;
    }
  }
  return null;
}

function inferImagePath(element: HTMLImageElement, data: Record<string, unknown>): string | null {
  const src = element.src;
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string" && src.includes(value)) {
      return key;
    }
  }
  return null;
}

function inferButtonPath(element: HTMLElement, data: Record<string, unknown>): string | null {
  const text = element.textContent?.trim();
  if (!text) return null;

  // Check common CTA field names
  const ctaFields = ["ctaText", "buttonText", "linkText", "ctaPrimaryText", "ctaSecondaryText"];
  for (const field of ctaFields) {
    if (data[field] === text) {
      return field;
    }
  }
  return null;
}
