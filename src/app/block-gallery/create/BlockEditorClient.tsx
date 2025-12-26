"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BlockEditor } from "../components/BlockEditor";
import styles from "./CreateBlock.module.css";

export interface FieldDefinition {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  defaultValue?: string;
  options?: string[]; // For select fields
  fields?: FieldDefinition[]; // For object/array fields
}

export type FieldType =
  | "string"
  | "text"
  | "number"
  | "boolean"
  | "image"
  | "rich-text"
  | "select"
  | "object"
  | "array";

export interface BlockDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: FieldDefinition[];
}

const initialBlock: BlockDefinition = {
  id: "",
  name: "",
  description: "",
  category: "content",
  fields: [],
};

export function BlockEditorClient() {
  const [block, setBlock] = useState<BlockDefinition>(initialBlock);
  const [showPreview, setShowPreview] = useState(true);

  const isValid = useMemo(() => {
    return (
      block.id.trim() !== "" &&
      block.name.trim() !== "" &&
      /^[a-z][a-zA-Z0-9]*$/.test(block.id)
    );
  }, [block.id, block.name]);

  const handleExport = () => {
    const schema = generateTinaSchema(block);
    const blob = new Blob([schema], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${block.id || "block"}-schema.ts`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/block-gallery" className={styles.backLink}>
            ← Volver a la galeria
          </Link>
          <h1 className={styles.title}>Crear Nuevo Bloque</h1>
        </div>
        <div className={styles.headerActions}>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={styles.togglePreview}
          >
            {showPreview ? "Ocultar" : "Mostrar"} Preview
          </button>
          <button
            onClick={handleExport}
            disabled={!isValid}
            className={`${styles.exportBtn} ${!isValid ? styles.exportBtnDisabled : ""}`}
          >
            Exportar Schema
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className={`${styles.main} ${showPreview ? styles.mainWithPreview : ""}`}>
        {/* Editor */}
        <div className={styles.editorPane}>
          <BlockEditor block={block} onChange={setBlock} />
        </div>

        {/* Preview */}
        {showPreview && (
          <div className={styles.previewPane}>
            <div className={styles.previewHeader}>
              <h3>Preview en Tiempo Real</h3>
            </div>
            <div className={styles.previewContent}>
              <BlockPreview block={block} />
            </div>
          </div>
        )}
      </div>

      {/* Schema Output */}
      <div className={styles.schemaSection}>
        <h3 className={styles.schemaTitle}>Schema TinaCMS Generado</h3>
        <pre className={styles.schemaCode}>
          {generateTinaSchema(block)}
        </pre>
      </div>
    </div>
  );
}

function BlockPreview({ block }: { block: BlockDefinition }) {
  if (!block.name) {
    return (
      <div className={styles.previewEmpty}>
        <p>Configura el bloque para ver el preview</p>
      </div>
    );
  }

  return (
    <div className={styles.previewBlock}>
      <div className={styles.previewBlockHeader}>
        <span className={styles.previewBlockName}>{block.name}</span>
        <code className={styles.previewBlockId}>{block.id || "block-id"}</code>
      </div>
      {block.description && (
        <p className={styles.previewBlockDesc}>{block.description}</p>
      )}
      {block.fields.length > 0 ? (
        <div className={styles.previewFields}>
          {block.fields.map((field) => (
            <FieldPreview key={field.id} field={field} />
          ))}
        </div>
      ) : (
        <p className={styles.previewNoFields}>Sin campos configurados</p>
      )}
    </div>
  );
}

function FieldPreview({ field, depth = 0 }: { field: FieldDefinition; depth?: number }) {
  return (
    <div className={styles.fieldPreview} style={{ marginLeft: depth * 16 }}>
      <div className={styles.fieldPreviewHeader}>
        <span className={styles.fieldPreviewLabel}>
          {field.label || field.name}
          {field.required && <span className={styles.required}>*</span>}
        </span>
        <span className={styles.fieldPreviewType}>{field.type}</span>
      </div>
      {field.type === "object" && field.fields && field.fields.length > 0 && (
        <div className={styles.nestedFields}>
          {field.fields.map((nestedField) => (
            <FieldPreview key={nestedField.id} field={nestedField} depth={depth + 1} />
          ))}
        </div>
      )}
      {field.type === "array" && field.fields && field.fields.length > 0 && (
        <div className={styles.nestedFields}>
          <span className={styles.arrayIndicator}>[array of]</span>
          {field.fields.map((nestedField) => (
            <FieldPreview key={nestedField.id} field={nestedField} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function generateTinaSchema(block: BlockDefinition): string {
  const fieldsCode = block.fields
    .map((field) => generateFieldSchema(field, 2))
    .join(",\n");

  return `// TinaCMS Schema for ${block.name || "Block"}
export const ${block.id || "block"}Template = {
  name: "${block.id || "block"}",
  label: "${block.name || "Block"}",
  fields: [
${fieldsCode}
  ],
};
`;
}

function generateFieldSchema(field: FieldDefinition, indent: number): string {
  const spaces = "  ".repeat(indent);
  const lines: string[] = [];

  lines.push(`${spaces}{`);
  lines.push(`${spaces}  type: "${mapFieldType(field.type)}",`);
  lines.push(`${spaces}  name: "${field.name}",`);
  lines.push(`${spaces}  label: "${field.label || field.name}",`);

  if (field.required) {
    lines.push(`${spaces}  required: true,`);
  }

  if (field.type === "select" && field.options) {
    lines.push(`${spaces}  options: [${field.options.map((o) => `"${o}"`).join(", ")}],`);
  }

  if ((field.type === "object" || field.type === "array") && field.fields) {
    lines.push(`${spaces}  fields: [`);
    field.fields.forEach((nestedField, i) => {
      lines.push(generateFieldSchema(nestedField, indent + 2) + (i < field.fields!.length - 1 ? "," : ""));
    });
    lines.push(`${spaces}  ],`);
  }

  lines.push(`${spaces}}`);

  return lines.join("\n");
}

function mapFieldType(type: FieldType): string {
  switch (type) {
    case "text":
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "image":
      return "image";
    case "rich-text":
      return "rich-text";
    case "select":
      return "string";
    case "object":
      return "object";
    case "array":
      return "object";
    default:
      return "string";
  }
}
