"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  logo?: string;
  ctaText?: string;
  ctaLink?: string;
  tinaField?: string;
}

// Menu hamburger icon (Figma exact: 3 lines, stroke #E6E6E6, strokeWidth 2.08)
function MenuIcon() {
  return (
    <div className="w-[25px] h-[25px] relative overflow-hidden">
      <svg
        width="19"
        height="13"
        viewBox="0 0 19 13"
        fill="none"
        className="absolute left-[3.12px] top-[6.25px]"
      >
        <path
          d="M0 1H19M0 6.5H19M0 12H19"
          stroke="#E6E6E6"
          strokeWidth="2.08"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// Choiz logo in white (Figma exact dimensions)
function ChoizLogo() {
  return (
    <div className="w-[78px] h-[24px] relative">
      {/* C */}
      <div
        className="absolute left-0 top-[3.63px] w-[18.69px] h-[20.18px]"
        style={{
          background: '#FCFCFD',
          clipPath: 'polygon(100% 15%, 75% 0%, 25% 0%, 0% 25%, 0% 75%, 25% 100%, 75% 100%, 100% 85%, 100% 65%, 70% 65%, 60% 80%, 40% 80%, 25% 65%, 25% 35%, 40% 20%, 60% 20%, 70% 35%, 100% 35%)'
        }}
      />
      {/* h */}
      <div
        className="absolute left-[18.19px] top-0 w-[19.95px] h-[23.80px] bg-[#FCFCFD]"
        style={{
          clipPath: 'polygon(0% 0%, 30% 0%, 30% 40%, 50% 35%, 70% 35%, 85% 45%, 85% 100%, 55% 100%, 55% 55%, 45% 50%, 30% 50%, 30% 100%, 0% 100%)'
        }}
      />
      {/* o */}
      <div
        className="absolute left-[37.50px] top-[8.64px] w-[16.54px] h-[15.36px] bg-[#FCFCFD]"
        style={{
          borderRadius: '50%',
          background: '#FCFCFD',
          clipPath: 'polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%, 50% 0%, 50% 25%, 30% 35%, 25% 50%, 30% 65%, 50% 75%, 70% 65%, 75% 50%, 70% 35%, 50% 25%)'
        }}
      />
      {/* i */}
      <div
        className="absolute left-[53.26px] top-[1.46px] w-[9.98px] h-[22.34px] bg-[#FCFCFD]"
        style={{
          clipPath: 'polygon(25% 0%, 75% 0%, 75% 12%, 25% 12%, 25% 0%, 25% 22%, 75% 22%, 75% 100%, 25% 100%, 25% 22%)'
        }}
      />
      {/* z */}
      <div
        className="absolute left-[62.35px] top-[7.87px] w-[15.65px] h-[15.93px] bg-[#FCFCFD]"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 20%, 35% 20%, 100% 80%, 100% 100%, 0% 100%, 0% 80%, 65% 80%, 0% 20%)'
        }}
      />
    </div>
  );
}

// Simple text logo as fallback
function ChoizLogoText() {
  return (
    <span className="text-[#FCFCFD] text-[24px] font-bold tracking-tight" style={{ fontFamily: 'system-ui' }}>
      Choiz
    </span>
  );
}

export function Navbar({
  ctaText = "Comienza hoy",
  ctaLink = "/quiz",
  tinaField,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className="absolute top-0 left-0 right-0 z-50"
      data-tina-field={tinaField}
    >
      {/* Nav container - Mobile: pt-16px, px-16px | Desktop: pt-32px */}
      <div className="w-full pt-4 md:pt-8 flex flex-col justify-end items-start px-4 md:px-[calc((100%-1024px)/2)]">

        {/* ============================================ */}
        {/* MOBILE NAV BAR (< md) */}
        {/* Figma: 343px, px-20, py-12, bg rgba(56,56,56,0.70), rounded-80 */}
        {/* Layout: Logo left | CTA + Menu right */}
        {/* ============================================ */}
        <nav className="md:hidden flex items-center justify-between w-full bg-[rgba(56,56,56,0.70)] rounded-[80px] px-5 py-3">
          {/* Logo - Figma: 58.5x18px */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/choiz-logo-white.svg"
              alt="Choiz"
              width={59}
              height={18}
              className="h-[18px] w-auto"
              priority
            />
          </Link>

          {/* Right side: CTA + Menu icon */}
          <div className="flex items-center gap-3">
            {/* CTA Button - Figma: h-32px, text-12px, px-16, rounded-20 */}
            <Link
              href={ctaLink}
              className="flex items-center justify-center h-8 px-4 bg-[rgba(255,255,255,0.87)] hover:bg-white text-[#3B3345] text-[12px] font-medium leading-[15px] rounded-[20px] transition-colors text-center whitespace-nowrap"
            >
              Comenzar
            </Link>

            {/* Menu icon */}
            <button
              className="flex items-center justify-center"
              aria-label="Menú"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={20} className="text-[#E6E6E6]" />
              ) : (
                <MenuIcon />
              )}
            </button>
          </div>
        </nav>

        {/* ============================================ */}
        {/* DESKTOP NAV BAR (>= md) */}
        {/* Figma: 1024px, px-20, py-16, bg rgba(56,56,56,0.70), rounded-80, gap-32 */}
        {/* Layout: Menu left | Logo center | CTA right */}
        {/* ============================================ */}
        <nav className="hidden md:inline-flex items-center gap-8 w-full max-w-[1024px] bg-[rgba(56,56,56,0.70)] rounded-[80px] px-5 py-4">

          {/* Menu icon container - Figma: w-141, h-40, pl-12 */}
          <div className="flex items-center justify-start h-10 pl-3 w-[141px]">
            <button
              className="flex items-center justify-center"
              aria-label="Menú"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X size={25} className="text-[#E6E6E6]" />
              ) : (
                <MenuIcon />
              )}
            </button>
          </div>

          {/* Logo container - Figma: flex-1, px-8, justify-center */}
          <div className="flex-1 flex items-center justify-center px-2 gap-[10px]">
            <Link href="/" className="flex items-center justify-center">
              <Image
                src="/images/choiz-logo-white.svg"
                alt="Choiz"
                width={78}
                height={24}
                className="h-6 w-auto"
                priority
              />
            </Link>
          </div>

          {/* CTA container - Figma: gap-20 > gap-16 */}
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-end gap-4">
              <Link
                href={ctaLink}
                className="flex items-center justify-center h-12 px-6 bg-[#EAEAEA] hover:bg-white text-[#3B3345] text-[14px] font-medium leading-[17px] rounded-[32px] transition-colors text-center whitespace-nowrap"
              >
                {ctaText}
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-[rgba(56,56,56,0.95)] rounded-[24px] backdrop-blur-md">
          <div className="px-6 py-6 space-y-4">
            <Link
              href={ctaLink}
              className="block w-full py-4 text-center bg-[#EAEAEA] hover:bg-white text-[#3B3345] rounded-full font-medium transition-colors"
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
