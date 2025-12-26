"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import styles from "./ImagePicker.module.css";

interface ImagePickerProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

interface MediaItem {
  filename: string;
  src: string;
}

export function ImagePicker({ value, onChange, onClose }: ImagePickerProps) {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dragOver, setDragOver] = useState(false);

  // Fetch images from public/images directory
  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      if (data.images) {
        setImages(data.images);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useState(() => {
    fetchImages();
  });

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );

    if (files.length === 0) return;

    setUploading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/media/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          await fetchImages();
        }
      }
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/media/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          await fetchImages();
        }
      }
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      setUploading(false);
    }
  };

  const filteredImages = images.filter((img) =>
    img.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Seleccionar imagen</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            &times;
          </button>
        </div>

        <div className={styles.toolbar}>
          <input
            type="text"
            placeholder="Buscar imagenes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <label className={styles.uploadBtn}>
            {uploading ? "Subiendo..." : "Subir imagen"}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              hidden
              disabled={uploading}
            />
          </label>
        </div>

        <div
          className={`${styles.dropZone} ${dragOver ? styles.dragOver : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {loading ? (
            <div className={styles.loading}>Cargando imagenes...</div>
          ) : filteredImages.length === 0 ? (
            <div className={styles.empty}>
              {searchTerm ? "No se encontraron imagenes" : "Arrastra imagenes aqui o haz click en Subir"}
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredImages.map((img) => (
                <button
                  key={img.src}
                  onClick={() => {
                    onChange(img.src);
                    onClose();
                  }}
                  className={`${styles.imageItem} ${value === img.src ? styles.selected : ""}`}
                >
                  <Image
                    src={img.src}
                    alt={img.filename}
                    width={120}
                    height={80}
                    className={styles.thumbnail}
                    style={{ objectFit: "cover" }}
                  />
                  <span className={styles.filename}>{img.filename}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {value && (
          <div className={styles.preview}>
            <span className={styles.previewLabel}>Imagen actual:</span>
            <code className={styles.previewPath}>{value}</code>
          </div>
        )}
      </div>
    </div>
  );
}
