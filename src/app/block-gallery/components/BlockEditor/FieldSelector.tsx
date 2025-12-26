"use client";

import { useState } from "react";
import type { FieldDefinition, FieldType } from "../../create/BlockEditorClient";
import styles from "./BlockEditor.module.css";

interface FieldSelectorProps {
  onAdd: (field: FieldDefinition) => void;
}

const fieldTypes: { type: FieldType; label: string; description: string; icon: string }[] = [
  { type: "string", label: "Texto corto", description: "Input de una linea", icon: "Aa" },
  { type: "text", label: "Texto largo", description: "Textarea multilinea", icon: "¶" },
  { type: "number", label: "Numero", description: "Valores numericos", icon: "#" },
  { type: "boolean", label: "Si/No", description: "Toggle on/off", icon: "◯" },
  { type: "image", label: "Imagen", description: "Subir imagen", icon: "🖼" },
  { type: "rich-text", label: "Rich Text", description: "Texto con formato", icon: "B" },
  { type: "select", label: "Selector", description: "Opciones predefinidas", icon: "▾" },
  { type: "object", label: "Objeto", description: "Grupo de campos", icon: "{}" },
  { type: "array", label: "Lista", description: "Multiples elementos", icon: "[]" },
];

export function FieldSelector({ onAdd }: FieldSelectorProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedType, setSelectedType] = useState<FieldType | null>(null);
  const [fieldName, setFieldName] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");

  const handleAdd = () => {
    if (!selectedType || !fieldName.trim()) return;

    const newField: FieldDefinition = {
      id: `field_${Date.now()}`,
      name: fieldName.trim(),
      label: fieldLabel.trim() || fieldName.trim(),
      type: selectedType,
      required: false,
    };

    if (selectedType === "object" || selectedType === "array") {
      newField.fields = [];
    }

    if (selectedType === "select") {
      newField.options = ["Opcion 1", "Opcion 2"];
    }

    onAdd(newField);
    resetForm();
  };

  const resetForm = () => {
    setIsAdding(false);
    setSelectedType(null);
    setFieldName("");
    setFieldLabel("");
  };

  const nameError =
    fieldName && !/^[a-z][a-zA-Z0-9]*$/.test(fieldName)
      ? "Debe comenzar con minuscula, solo letras y numeros"
      : null;

  if (!isAdding) {
    return (
      <button onClick={() => setIsAdding(true)} className={styles.addFieldBtn}>
        + Agregar Campo
      </button>
    );
  }

  return (
    <div className={styles.fieldSelectorContainer}>
      <div className={styles.fieldSelectorHeader}>
        <h3>Agregar Campo</h3>
        <button onClick={resetForm} className={styles.cancelBtn}>
          Cancelar
        </button>
      </div>

      {/* Step 1: Select Type */}
      {!selectedType && (
        <div className={styles.typeGrid}>
          {fieldTypes.map((ft) => (
            <button
              key={ft.type}
              onClick={() => setSelectedType(ft.type)}
              className={styles.typeCard}
            >
              <span className={styles.typeIcon}>{ft.icon}</span>
              <span className={styles.typeLabel}>{ft.label}</span>
              <span className={styles.typeDesc}>{ft.description}</span>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Configure Field */}
      {selectedType && (
        <div className={styles.fieldConfig}>
          <div className={styles.selectedType}>
            <span>Tipo seleccionado:</span>
            <code>{selectedType}</code>
            <button onClick={() => setSelectedType(null)} className={styles.changeTypeBtn}>
              Cambiar
            </button>
          </div>

          <div className={styles.configForm}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nombre del campo *</label>
              <input
                type="text"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                placeholder="headline"
                className={`${styles.input} ${nameError ? styles.inputError : ""}`}
                autoFocus
              />
              {nameError && <span className={styles.error}>{nameError}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Etiqueta (label)</label>
              <input
                type="text"
                value={fieldLabel}
                onChange={(e) => setFieldLabel(e.target.value)}
                placeholder="Titulo Principal"
                className={styles.input}
              />
              <span className={styles.hint}>Se muestra en el editor TinaCMS</span>
            </div>

            <button
              onClick={handleAdd}
              disabled={!fieldName.trim() || !!nameError}
              className={`${styles.confirmBtn} ${(!fieldName.trim() || nameError) ? styles.confirmBtnDisabled : ""}`}
            >
              Agregar Campo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
