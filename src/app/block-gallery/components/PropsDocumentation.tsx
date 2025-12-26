"use client";

import styles from "./PropsDocumentation.module.css";

interface PropInfo {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
}

interface PropsDocumentationProps {
  props: PropInfo[];
  blockName?: string;
}

export function PropsDocumentation({ props, blockName }: PropsDocumentationProps) {
  if (props.length === 0) {
    return (
      <div className={styles.empty}>
        No se encontraron props documentadas para este bloque.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Props</h3>
        {blockName && (
          <code className={styles.interface}>{blockName}Props</code>
        )}
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Requerido</th>
              <th>Valor por defecto</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => (
              <tr key={prop.name}>
                <td>
                  <code className={styles.propName}>{prop.name}</code>
                </td>
                <td>
                  <code className={styles.propType}>{formatType(prop.type)}</code>
                </td>
                <td>
                  <span className={prop.optional ? styles.optional : styles.required}>
                    {prop.optional ? "No" : "Si"}
                  </span>
                </td>
                <td>
                  {prop.defaultValue ? (
                    <code className={styles.defaultValue}>
                      {formatDefaultValue(prop.defaultValue)}
                    </code>
                  ) : (
                    <span className={styles.noDefault}>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick summary */}
      <div className={styles.summary}>
        <span className={styles.summaryItem}>
          <strong>{props.filter((p) => !p.optional).length}</strong> requeridos
        </span>
        <span className={styles.summaryItem}>
          <strong>{props.filter((p) => p.optional).length}</strong> opcionales
        </span>
        <span className={styles.summaryItem}>
          <strong>{props.filter((p) => p.defaultValue).length}</strong> con valor por defecto
        </span>
      </div>
    </div>
  );
}

function formatType(type: string): string {
  // Truncate very long types for display
  if (type.length > 50) {
    return type.substring(0, 47) + "...";
  }
  return type;
}

function formatDefaultValue(value: string): string {
  // Truncate very long defaults
  if (value.length > 40) {
    return value.substring(0, 37) + "...";
  }
  return value;
}
