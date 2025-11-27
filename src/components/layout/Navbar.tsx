"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { normalizeImageUrl } from "@/lib/images";

interface NavbarProps {
  logo?: string;
  ctaText?: string;
  ctaLink?: string;
  tinaField?: string;
}

export function Navbar({
  logo = "/images/choiz-logo.svg",
  ctaText = "Comenzar",
  ctaLink = "/quiz",
  tinaField,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300",
        isScrolled && "shadow-[0px_1px_34px_0px_rgba(16,24,40,0.08)]"
      )}
      data-tina-field={tinaField}
    >
      <div className="w-full px-4 md:px-[72px]">
        <nav className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={normalizeImageUrl(logo)}
              alt="Choiz"
              width={104}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-8">
            {/* User Icon */}
            <button
              className="w-10 h-10 flex items-center justify-center"
              aria-label="Mi cuenta"
            >
              <Image
                src="/images/icons/user.svg"
                alt="Usuario"
                width={24}
                height={24}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </button>

            {/* Menu Icon */}
            <button
              className="w-12 h-12 flex items-center justify-center"
              aria-label="Menú"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Image
                src="/images/icons/menu.svg"
                alt="Menú"
                width={24}
                height={24}
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              className="w-10 h-10 flex items-center justify-center"
              aria-label="Mi cuenta"
            >
              <Image
                src="/images/icons/user.svg"
                alt="Usuario"
                width={20}
                height={20}
                className="opacity-70"
              />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-[#B1B1B1]" />
              ) : (
                <Image
                  src="/images/icons/menu.svg"
                  alt="Menú"
                  width={20}
                  height={20}
                  className="opacity-70"
                />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-white border-t border-gray-100">
          <div className="px-4 py-6 space-y-4">
            <Link
              href={ctaLink}
              className="block w-full py-4 text-center bg-[#1D1D1B] hover:bg-black text-white rounded-full font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {ctaText}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
