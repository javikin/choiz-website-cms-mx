"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./TypedPropsEditor.module.css";

interface TypedPropsEditorProps {
  section: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  onImageSelect: (key: string) => void;
}

export function TypedPropsEditor({ section, onChange, onImageSelect }: TypedPropsEditorProps) {
  const props = Object.entries(section).filter(([key]) => key !== "_template");

  if (props.length === 0) {
    return <div className={styles.empty}>Este bloque no tiene propiedades editables</div>;
  }

  // Group props by type for better organization
  const textProps = props.filter(([, v]) => typeof v === "string" && !isImagePath(v as string));
  const imageProps = props.filter(([, v]) => typeof v === "string" && isImagePath(v as string));
  const numberProps = props.filter(([, v]) => typeof v === "number");
  const booleanProps = props.filter(([, v]) => typeof v === "boolean");
  const arrayProps = props.filter(([, v]) => Array.isArray(v));
  const objectProps = props.filter(
    ([, v]) => typeof v === "object" && v !== null && !Array.isArray(v)
  );

  return (
    <div className={styles.container}>
      {/* Text Fields */}
      {textProps.length > 0 && (
        <PropsGroup title="Textos">
          {textProps.map(([key, value]) => (
            <TextField
              key={key}
              name={key}
              value={value as string}
              onChange={(v) => onChange(key, v)}
            />
          ))}
        </PropsGroup>
      )}

      {/* Image Fields */}
      {imageProps.length > 0 && (
        <PropsGroup title="Imagenes">
          {imageProps.map(([key, value]) => (
            <ImageField
              key={key}
              name={key}
              value={value as string}
              onSelect={() => onImageSelect(key)}
            />
          ))}
        </PropsGroup>
      )}

      {/* Number Fields */}
      {numberProps.length > 0 && (
        <PropsGroup title="Numeros">
          {numberProps.map(([key, value]) => (
            <NumberField
              key={key}
              name={key}
              value={value as number}
              onChange={(v) => onChange(key, v)}
            />
          ))}
        </PropsGroup>
      )}

      {/* Boolean Fields */}
      {booleanProps.length > 0 && (
        <PropsGroup title="Opciones">
          {booleanProps.map(([key, value]) => (
            <BooleanField
              key={key}
              name={key}
              value={value as boolean}
              onChange={(v) => onChange(key, v)}
            />
          ))}
        </PropsGroup>
      )}

      {/* Array Fields */}
      {arrayProps.length > 0 && (
        <PropsGroup title="Listas">
          {arrayProps.map(([key, value]) => (
            <ArrayField
              key={key}
              name={key}
              value={value as unknown[]}
              onChange={(v) => onChange(key, v)}
            />
          ))}
        </PropsGroup>
      )}

      {/* Object Fields */}
      {objectProps.length > 0 && (
        <PropsGroup title="Objetos">
          {objectProps.map(([key, value]) => (
            <ObjectField key={key} name={key} value={value as Record<string, unknown>} />
          ))}
        </PropsGroup>
      )}
    </div>
  );
}

function PropsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.group}>
      <button className={styles.groupHeader} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.groupTitle}>{title}</span>
        <span className={styles.groupToggle}>{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className={styles.groupContent}>{children}</div>}
    </div>
  );
}

function TextField({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const isLong = value.length > 50;
  return (
    <div className={styles.field}>
      <label className={styles.label}>{formatLabel(name)}</label>
      {isLong ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.textarea}
          rows={3}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
        />
      )}
    </div>
  );
}

function ImageField({
  name,
  value,
  onSelect,
}: {
  name: string;
  value: string;
  onSelect: () => void;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{formatLabel(name)}</label>
      <div className={styles.imagePreview}>
        {value ? (
          <Image src={value} alt={name} width={80} height={60} className={styles.thumbnail} />
        ) : (
          <div className={styles.noImage}>Sin imagen</div>
        )}
        <button onClick={onSelect} className={styles.changeBtn}>
          Cambiar
        </button>
      </div>
      <code className={styles.imagePath}>{value}</code>
    </div>
  );
}

function NumberField({
  name,
  value,
  onChange,
}: {
  name: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{formatLabel(name)}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.input}
      />
    </div>
  );
}

function BooleanField({
  name,
  value,
  onChange,
}: {
  name: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className={styles.checkboxField}>
      <label className={styles.checkboxLabel}>
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        {formatLabel(name)}
      </label>
    </div>
  );
}

function ArrayField({
  name,
  value,
  onChange,
}: {
  name: string;
  value: unknown[];
  onChange: (v: unknown[]) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.field}>
      <div className={styles.arrayHeader}>
        <label className={styles.label}>
          {formatLabel(name)}{" "}
          <span className={styles.arrayCount}>({value.length} items)</span>
        </label>
        <button onClick={() => setExpanded(!expanded)} className={styles.expandBtn}>
          {expanded ? "Colapsar" : "Expandir"}
        </button>
      </div>
      {expanded && (
        <div className={styles.arrayItems}>
          {value.map((item, index) => (
            <div key={index} className={styles.arrayItem}>
              <span className={styles.arrayIndex}>{index + 1}</span>
              <code className={styles.arrayItemContent}>
                {typeof item === "object" ? JSON.stringify(item, null, 2) : String(item)}
              </code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ObjectField({ name, value }: { name: string; value: Record<string, unknown> }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.field}>
      <div className={styles.objectHeader}>
        <label className={styles.label}>{formatLabel(name)}</label>
        <button onClick={() => setExpanded(!expanded)} className={styles.expandBtn}>
          {expanded ? "Colapsar" : "Ver"}
        </button>
      </div>
      {expanded && (
        <pre className={styles.objectContent}>{JSON.stringify(value, null, 2)}</pre>
      )}
    </div>
  );
}

function formatLabel(name: string): string {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function isImagePath(value: string): boolean {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
  const lowerValue = value.toLowerCase();
  return (
    imageExtensions.some((ext) => lowerValue.endsWith(ext)) ||
    lowerValue.startsWith("/images/") ||
    lowerValue.startsWith("http")
  );
}
