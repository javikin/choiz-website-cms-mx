"use client";

import { useState, useCallback } from "react";
import styles from "./DevicePreview.module.css";

type DeviceType = "mobile" | "tablet" | "desktop";

interface Viewport {
  width: number;
  height: number;
  label: string;
  icon: string;
}

const viewports: Record<DeviceType, Viewport> = {
  mobile: { width: 375, height: 667, label: "Movil", icon: "📱" },
  tablet: { width: 768, height: 1024, label: "Tablet", icon: "📱" },
  desktop: { width: 1440, height: 900, label: "Desktop", icon: "🖥️" },
};

interface DevicePreviewClientProps {
  slug: string;
}

export function DevicePreviewClient({ slug }: DevicePreviewClientProps) {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [isRotated, setIsRotated] = useState(false);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentViewport = viewports[device];
  const effectiveWidth = isRotated ? currentViewport.height : currentViewport.width;
  const effectiveHeight = isRotated ? currentViewport.width : currentViewport.height;

  // Calculate scale to fit in viewport
  const calculateAutoScale = useCallback(() => {
    if (typeof window === "undefined") return 1;
    const maxWidth = window.innerWidth - 300; // Account for sidebar
    const maxHeight = window.innerHeight - 150; // Account for header
    const scaleX = maxWidth / effectiveWidth;
    const scaleY = maxHeight / effectiveHeight;
    return Math.min(scaleX, scaleY, 1);
  }, [effectiveWidth, effectiveHeight]);

  const previewUrl = slug === "home" ? "/" : `/${slug}`;

  const handleDeviceChange = (newDevice: DeviceType) => {
    setDevice(newDevice);
    setIsRotated(false);
    // Auto-scale for mobile/tablet
    if (newDevice !== "desktop") {
      setScale(calculateAutoScale());
    } else {
      setScale(1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setScale(1);
    }
  };

  return (
    <div className={`${styles.container} ${isFullscreen ? styles.fullscreen : ""}`}>
      {/* Header Controls */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <a href="/block-gallery" className={styles.backLink}>
            ← Galeria
          </a>
          <span className={styles.pageName}>/{slug}</span>
        </div>

        {/* Device Selector */}
        <div className={styles.deviceSelector}>
          {(Object.keys(viewports) as DeviceType[]).map((deviceType) => (
            <button
              key={deviceType}
              onClick={() => handleDeviceChange(deviceType)}
              className={`${styles.deviceButton} ${
                device === deviceType ? styles.deviceButtonActive : ""
              }`}
              title={viewports[deviceType].label}
            >
              <span className={styles.deviceIcon}>
                {viewports[deviceType].icon}
              </span>
              <span className={styles.deviceLabel}>
                {viewports[deviceType].label}
              </span>
            </button>
          ))}
        </div>

        {/* Additional Controls */}
        <div className={styles.headerRight}>
          {/* Rotate Button (only for mobile/tablet) */}
          {device !== "desktop" && (
            <button
              onClick={() => setIsRotated(!isRotated)}
              className={styles.controlButton}
              title={isRotated ? "Portrait" : "Landscape"}
            >
              🔄
            </button>
          )}

          {/* Scale Controls */}
          <div className={styles.scaleControls}>
            <button
              onClick={() => setScale(Math.max(0.25, scale - 0.1))}
              className={styles.scaleButton}
              title="Reducir"
            >
              −
            </button>
            <span className={styles.scaleValue}>{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale(Math.min(2, scale + 0.1))}
              className={styles.scaleButton}
              title="Aumentar"
            >
              +
            </button>
            <button
              onClick={() => setScale(1)}
              className={styles.scaleButton}
              title="100%"
            >
              1:1
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className={styles.controlButton}
            title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            {isFullscreen ? "⛶" : "⛶"}
          </button>

          {/* Open in New Tab */}
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.controlButton}
            title="Abrir en nueva pestaña"
          >
            ↗
          </a>
        </div>
      </header>

      {/* Viewport Info */}
      <div className={styles.viewportInfo}>
        <span>
          {effectiveWidth} × {effectiveHeight}px
        </span>
        {isRotated && <span className={styles.rotatedBadge}>Landscape</span>}
      </div>

      {/* Preview Area */}
      <div className={styles.previewArea}>
        <div
          className={styles.deviceFrame}
          style={{
            width: effectiveWidth * scale,
            height: effectiveHeight * scale,
          }}
        >
          {/* Device Bezel for mobile/tablet */}
          {device !== "desktop" && (
            <div
              className={`${styles.bezel} ${
                device === "mobile" ? styles.bezelMobile : styles.bezelTablet
              }`}
            >
              <div className={styles.notch} />
            </div>
          )}

          {/* Iframe */}
          <iframe
            src={previewUrl}
            className={styles.iframe}
            style={{
              width: effectiveWidth,
              height: effectiveHeight,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
            title={`Preview de ${slug}`}
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className={styles.quickLinks}>
        <span className={styles.quickLinksLabel}>Paginas:</span>
        <a
          href="/preview/home"
          className={`${styles.quickLink} ${slug === "home" ? styles.quickLinkActive : ""}`}
        >
          Home
        </a>
        <a
          href="/preview/ejemplo"
          className={`${styles.quickLink} ${slug === "ejemplo" ? styles.quickLinkActive : ""}`}
        >
          Ejemplo
        </a>
        <a href="/api/pages" target="_blank" className={styles.quickLink}>
          Ver todas →
        </a>
      </div>
    </div>
  );
}
