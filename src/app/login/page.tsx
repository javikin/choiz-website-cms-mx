"use client";

import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    // Redirect to Tina admin for authentication
    window.location.href = "/admin/index.html";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-700 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirigiendo al editor...</p>
      </div>
    </div>
  );
}
