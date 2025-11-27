"use client";

import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export function EditButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or if explicitly enabled
    const isDev = process.env.NODE_ENV === "development";
    const isAdmin = window.location.search.includes("edit=true");
    setIsVisible(isDev || isAdmin);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="/admin/index.html"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-violet-700 hover:bg-violet-800 text-white text-sm font-medium rounded-full shadow-lg transition-all hover:scale-105"
      title="Editar contenido"
    >
      <Pencil className="w-4 h-4" />
      <span>Editar</span>
    </a>
  );
}
