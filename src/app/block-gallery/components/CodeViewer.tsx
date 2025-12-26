"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import styles from "./CodeViewer.module.css";

interface CodeViewerProps {
  code: string;
  language?: string;
  fileName?: string;
  lineCount?: number;
}

export function CodeViewer({
  code,
  language = "tsx",
  fileName,
  lineCount,
}: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.fileInfo}>
          {fileName && <span className={styles.fileName}>{fileName}</span>}
          {lineCount && (
            <span className={styles.lineCount}>{lineCount} lineas</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={styles.copyButton}
          title="Copiar codigo"
        >
          {copied ? (
            <>
              <CheckIcon /> Copiado
            </>
          ) : (
            <>
              <CopyIcon /> Copiar
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className={styles.codeWrapper}>
        <Highlight theme={themes.nightOwl} code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} ${styles.pre}`} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className={styles.line}>
                  <span className={styles.lineNumber}>{i + 1}</span>
                  <span className={styles.lineContent}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
