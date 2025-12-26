"use client";

import { useState } from "react";
import type { FieldDefinition, FieldType } from "../../create/BlockEditorClient";
import styles from "./BlockEditor.module.css";

interface PropsConfiguratorProps {
  field: FieldDefinition;
  onChange: (updates: Partial<FieldDefinition>) => void;
}

export function PropsConfigurator({ field, onChange }: PropsConfiguratorProps) {
  const [newOption, setNewOption] = useState("");

  const addOption = () => {
    if (!newOption.trim()) return;
    const options = [...(field.options || []), newOption.trim()];
    onChange({ options });
    setNewOption("");
  };

  const removeOption = (index: number) => {
    const options = (field.options || []).filter((_, i) => i !== index);
    onChange({ options });
  };

  const addNestedField = () => {
    const newField: FieldDefinition = {
      id: `nested_${Date.now()}`,
      name: "",
      label: "",
      type: "string",
      required: false,
    };
    onChange({ fields: [...(field.fields || []), newField] });
  };

  const updateNestedField = (fieldId: string, updates: Partial<FieldDefinition>) => {
    const fields = (field.fields || []).map((f) =>
      f.id === fieldId ? { ...f, ...updates } : f
    );
    onChange({ fields });
  };

  const removeNestedField = (fieldId: string) => {
    const fields = (field.fields || []).filter((f) => f.id !== fieldId);
    onChange({ fields });
  };

  return (
    <div className={styles.propsConfigurator}>
      {/* Basic Properties */}
      <div className={styles.configRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            value={field.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Etiqueta</label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onChange({ label: e.target.value })}
            className={styles.input}
          />
        </div>
      </div>

      {/* Required Toggle */}
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => onChange({ required: e.target.checked })}
        />
        Campo requerido
      </label>

      {/* Default Value (for simple types) */}
      {["string", "text", "number"].includes(field.type) && (
        <div className={styles.formGroup}>
          <label className={styles.label}>Valor por defecto</label>
          <input
            type={field.type === "number" ? "number" : "text"}
            value={field.defaultValue || ""}
            onChange={(e) => onChange({ defaultValue: e.target.value })}
            className={styles.input}
            placeholder="Opcional"
          />
        </div>
      )}

      {/* Select Options */}
      {field.type === "select" && (
        <div className={styles.optionsSection}>
          <label className={styles.label}>Opciones</label>
          <div className={styles.optionsList}>
            {(field.options || []).map((option, index) => (
              <div key={index} className={styles.optionItem}>
                <span>{option}</span>
                <button
                  onClick={() => removeOption(index)}
                  className={styles.removeOptionBtn}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className={styles.addOptionRow}>
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Nueva opcion"
              className={styles.input}
              onKeyDown={(e) => e.key === "Enter" && addOption()}
            />
            <button onClick={addOption} className={styles.addOptionBtn}>
              +
            </button>
          </div>
        </div>
      )}

      {/* Nested Fields (for object/array) */}
      {(field.type === "object" || field.type === "array") && (
        <div className={styles.nestedSection}>
          <div className={styles.nestedHeader}>
            <label className={styles.label}>
              {field.type === "array" ? "Campos del elemento" : "Campos anidados"}
            </label>
            <button onClick={addNestedField} className={styles.addNestedBtn}>
              + Agregar
            </button>
          </div>

          {(field.fields || []).length > 0 ? (
            <div className={styles.nestedList}>
              {(field.fields || []).map((nestedField) => (
                <div key={nestedField.id} className={styles.nestedItem}>
                  <div className={styles.nestedInputRow}>
                    <input
                      type="text"
                      value={nestedField.name}
                      onChange={(e) => updateNestedField(nestedField.id, { name: e.target.value })}
                      placeholder="nombre"
                      className={styles.nestedInput}
                    />
                    <select
                      value={nestedField.type}
                      onChange={(e) => updateNestedField(nestedField.id, { type: e.target.value as FieldType })}
                      className={styles.nestedSelect}
                    >
                      <option value="string">Texto</option>
                      <option value="number">Numero</option>
                      <option value="boolean">Si/No</option>
                      <option value="image">Imagen</option>
                    </select>
                    <button
                      onClick={() => removeNestedField(nestedField.id)}
                      className={styles.removeNestedBtn}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noNested}>Sin campos anidados</p>
          )}
        </div>
      )}
    </div>
  );
}
