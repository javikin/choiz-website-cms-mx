"use client";

import { useEffect, useRef } from "react";
import type { BlockInfo } from "@/lib/block-gallery";
import type { ViewportSize } from "../BlocksEditorClient";
import styles from "./BlockPreview.module.css";

const viewportWidths: Record<ViewportSize, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
};

interface BlockPreviewProps {
  block: BlockInfo;
  previewData: Record<string, unknown>;
  viewport: ViewportSize;
  onViewportChange: (viewport: ViewportSize) => void;
  isLoading: boolean;
}

export function BlockPreview({
  block,
  previewData,
  viewport,
  onViewportChange,
  isLoading,
}: BlockPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const viewportWidth = viewportWidths[viewport];

  // Send preview data to iframe when it changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    const sendData = () => {
      iframe.contentWindow?.postMessage({
        type: "UPDATE_PREVIEW_DATA",
        previewData,
      }, "*");
    };

    // Wait for iframe to signal it's ready
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "PREVIEW_READY") {
        sendData();
      }
    };

    window.addEventListener("message", handleMessage);

    // Also send data immediately in case iframe is already loaded
    sendData();

    return () => window.removeEventListener("message", handleMessage);
  }, [previewData]);

  return (
    <div className={styles.container}>
      {/* Viewport Controls */}
      <div className={styles.controls}>
        <div className={styles.viewportToggle}>
          {(Object.keys(viewportWidths) as ViewportSize[]).map((size) => (
            <button
              key={size}
              className={`${styles.viewportButton} ${
                viewport === size ? styles.active : ""
              }`}
              onClick={() => onViewportChange(size)}
            >
              {size === "desktop" && "🖥️"}
              {size === "tablet" && "📱"}
              {size === "mobile" && "📲"}
              <span className={styles.viewportLabel}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </span>
            </button>
          ))}
        </div>
        <span className={styles.viewportSize}>{viewportWidth}px</span>
      </div>

      {/* Preview Area */}
      <div className={styles.previewArea}>
        {isLoading ? (
          <div className={styles.loading}>Cargando...</div>
        ) : (
          <iframe
            ref={iframeRef}
            src={`/blocks/preview/${block.id}`}
            className={styles.previewIframe}
            style={{ width: viewportWidth }}
            title={`Preview de ${block.name}`}
          />
        )}
      </div>
    </div>
  );
}
