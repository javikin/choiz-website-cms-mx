"use client";

import { useState } from "react";
import type { BlockDefinition, FieldDefinition } from "../../create/BlockEditorClient";
import { FieldSelector } from "./FieldSelector";
import { PropsConfigurator } from "./PropsConfigurator";
import styles from "./BlockEditor.module.css";

interface BlockEditorProps {
  block: BlockDefinition;
  onChange: (block: BlockDefinition) => void;
}

const categories = [
  { value: "hero", label: "Hero" },
  { value: "social-proof", label: "Social Proof" },
  { value: "trust", label: "Confianza" },
  { value: "products", label: "Productos" },
  { value: "content", label: "Contenido" },
  { value: "cta", label: "CTA" },
  { value: "footer", label: "Footer" },
];

export function BlockEditor({ block, onChange }: BlockEditorProps) {
  const [editingField, setEditingField] = useState<string | null>(null);

  const updateBlock = (updates: Partial<BlockDefinition>) => {
    onChange({ ...block, ...updates });
  };

  const addField = (field: FieldDefinition) => {
    updateBlock({ fields: [...block.fields, field] });
  };

  const updateField = (fieldId: string, updates: Partial<FieldDefinition>) => {
    updateBlock({
      fields: block.fields.map((f) =>
        f.id === fieldId ? { ...f, ...updates } : f
      ),
    });
  };

  const removeField = (fieldId: string) => {
    updateBlock({ fields: block.fields.filter((f) => f.id !== fieldId) });
  };

  const moveField = (fieldId: string, direction: "up" | "down") => {
    const index = block.fields.findIndex((f) => f.id === fieldId);
    if (index === -1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= block.fields.length) return;

    const newFields = [...block.fields];
    [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
    updateBlock({ fields: newFields });
  };

  const idError =
    block.id && !/^[a-z][a-zA-Z0-9]*$/.test(block.id)
      ? "El ID debe comenzar con minuscula y solo contener letras y numeros"
      : null;

  return (
    <div className={styles.container}>
      {/* Block Info Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Informacion del Bloque</h2>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>ID del Bloque *</label>
            <input
              type="text"
              value={block.id}
              onChange={(e) => updateBlock({ id: e.target.value })}
              placeholder="heroSection"
              className={`${styles.input} ${idError ? styles.inputError : ""}`}
            />
            {idError && <span className={styles.error}>{idError}</span>}
            <span className={styles.hint}>Identificador unico, ej: heroSection, ctaTimer</span>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre *</label>
            <input
              type="text"
              value={block.name}
              onChange={(e) => updateBlock({ name: e.target.value })}
              placeholder="Hero Section"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Categoria</label>
            <select
              value={block.category}
              onChange={(e) => updateBlock({ category: e.target.value })}
              className={styles.select}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Descripcion</label>
            <textarea
              value={block.description}
              onChange={(e) => updateBlock({ description: e.target.value })}
              placeholder="Describe el proposito del bloque..."
              className={styles.textarea}
              rows={2}
            />
          </div>
        </div>
      </section>

      {/* Fields Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Campos ({block.fields.length})</h2>
        </div>

        {/* Existing Fields */}
        {block.fields.length > 0 && (
          <div className={styles.fieldList}>
            {block.fields.map((field, index) => (
              <div key={field.id} className={styles.fieldItem}>
                <div className={styles.fieldHeader}>
                  <div className={styles.fieldInfo}>
                    <span className={styles.fieldName}>{field.label || field.name}</span>
                    <code className={styles.fieldType}>{field.type}</code>
                    {field.required && <span className={styles.requiredBadge}>Requerido</span>}
                  </div>
                  <div className={styles.fieldActions}>
                    <button
                      onClick={() => moveField(field.id, "up")}
                      disabled={index === 0}
                      className={styles.moveBtn}
                      title="Mover arriba"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveField(field.id, "down")}
                      disabled={index === block.fields.length - 1}
                      className={styles.moveBtn}
                      title="Mover abajo"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => setEditingField(editingField === field.id ? null : field.id)}
                      className={styles.editBtn}
                    >
                      {editingField === field.id ? "Cerrar" : "Editar"}
                    </button>
                    <button
                      onClick={() => removeField(field.id)}
                      className={styles.deleteBtn}
                      title="Eliminar"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Field Editor (expanded) */}
                {editingField === field.id && (
                  <div className={styles.fieldEditor}>
                    <PropsConfigurator
                      field={field}
                      onChange={(updates) => updateField(field.id, updates)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add Field */}
        <FieldSelector onAdd={addField} />
      </section>
    </div>
  );
}
