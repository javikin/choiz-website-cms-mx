"use client";

import { useState } from "react";
import styles from "./ButtonEditor.module.css";

interface ButtonData {
  text: string;
  link: string;
  variant?: string;
}

interface ButtonEditorProps {
  textValue: string;
  linkValue: string;
  variantValue?: string;
  onSave: (data: ButtonData) => void;
  onClose: () => void;
}

const BUTTON_VARIANTS = [
  { id: "primary", label: "Primario", color: "#7c3aed" },
  { id: "secondary", label: "Secundario", color: "#374151" },
  { id: "outline", label: "Outline", color: "transparent" },
  { id: "ghost", label: "Ghost", color: "transparent" },
  { id: "cta", label: "CTA (destacado)", color: "#059669" },
  { id: "danger", label: "Peligro", color: "#dc2626" },
];

export function ButtonEditor({
  textValue,
  linkValue,
  variantValue = "primary",
  onSave,
  onClose,
}: ButtonEditorProps) {
  const [text, setText] = useState(textValue);
  const [link, setLink] = useState(linkValue);
  const [variant, setVariant] = useState(variantValue);

  const handleSave = () => {
    onSave({ text, link, variant });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Editar boton</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            &times;
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.field}>
            <label className={styles.label}>Texto del boton</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles.input}
              placeholder="Ej: Comienza ahora"
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>URL destino</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className={styles.input}
              placeholder="Ej: /quiz o https://..."
            />
            <span className={styles.hint}>Usa / para rutas internas</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Estilo del boton</label>
            <div className={styles.variantGrid}>
              {BUTTON_VARIANTS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariant(v.id)}
                  className={`${styles.variantOption} ${variant === v.id ? styles.selected : ""}`}
                  style={{
                    backgroundColor: v.color,
                    color: v.color === "transparent" ? "#fff" : "#fff",
                    border: v.color === "transparent" ? "1px solid #444" : "none",
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.preview}>
            <label className={styles.label}>Vista previa</label>
            <div className={styles.previewBox}>
              <button
                className={styles.previewButton}
                style={{
                  backgroundColor:
                    BUTTON_VARIANTS.find((v) => v.id === variant)?.color || "#7c3aed",
                  border:
                    variant === "outline" || variant === "ghost"
                      ? "2px solid #7c3aed"
                      : "none",
                  color: variant === "outline" || variant === "ghost" ? "#7c3aed" : "#fff",
                }}
              >
                {text || "Texto del boton"}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancelBtn}>
            Cancelar
          </button>
          <button onClick={handleSave} className={styles.saveBtn}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
