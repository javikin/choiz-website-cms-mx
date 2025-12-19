"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X, User } from "lucide-react";

interface NavbarMinimalProps {
  logo?: string;
  loginLink?: string;
  tinaField?: string;
}

// Menu hamburger icon - Gray color (#B1B1B1)
function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6H21M3 12H21M3 18H21"
        stroke="#B1B1B1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// User icon - Gray color (#B1B1B1)
function UserIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
        stroke="#B1B1B1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NavbarMinimal({
  loginLink = "/login",
  tinaField,
}: NavbarMinimalProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 bg-white shadow-[0px_1px_34px_rgba(16,24,40,0.08)]"
      data-tina-field={tinaField}
    >
      {/* Desktop & Mobile Nav - Same layout */}
      <nav className="flex items-center justify-between px-4 md:px-[72px] py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/choiz-logo-dark.svg"
            alt="Choiz"
            width={104}
            height={32}
            className="h-[24px] md:h-[32px] w-auto"
            priority
          />
        </Link>

        {/* Right side: User icon + Menu */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* User icon */}
          <Link
            href={loginLink}
            className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Iniciar sesion"
          >
            <UserIcon />
          </Link>

          {/* Menu hamburger */}
          <button
            className="flex items-center justify-center w-12 h-12 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-[#B1B1B1]" />
            ) : (
              <MenuIcon />
            )}
          </button>
        </div>
      </nav>

      {/* Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-[0px_4px_34px_rgba(16,24,40,0.08)] border-t border-gray-100">
          <div className="px-4 md:px-[72px] py-6 space-y-4">
            <Link
              href="/productos"
              className="block py-3 text-[#3B3345] hover:text-[#6042AA] transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Productos
            </Link>
            <Link
              href="/como-funciona"
              className="block py-3 text-[#3B3345] hover:text-[#6042AA] transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Como funciona
            </Link>
            <Link
              href="/testimonios"
              className="block py-3 text-[#3B3345] hover:text-[#6042AA] transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonios
            </Link>
            <Link
              href="/faq"
              className="block py-3 text-[#3B3345] hover:text-[#6042AA] transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Preguntas frecuentes
            </Link>
            <hr className="border-gray-200" />
            <Link
              href="/quiz"
              className="block w-full py-4 text-center bg-[#292929] hover:bg-[#3B3345] text-white rounded-full font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Comenzar tratamiento
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
