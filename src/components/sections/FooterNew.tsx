"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { normalizeImageUrl } from "@/lib/images";
import styles from "./FooterNew.module.css";

interface FooterLink {
  text?: string;
  url?: string;
}

interface SocialLink {
  platform?: string;
  url?: string;
}

interface FooterNewProps {
  // App promo
  appTitle?: string;
  appSubtitle?: string;
  appImage?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  // Company
  companyLinks?: FooterLink[];
  // Founders
  founders?: { name?: string }[];
  // Resources
  resourceLinks?: FooterLink[];
  // Contact
  phone?: string;
  email?: string;
  // Hours
  hoursLabel?: string;
  hoursValue?: string;
  // Treatments
  treatmentLinks?: FooterLink[];
  // Legal
  legalLinks?: FooterLink[];
  cofeprisCode?: string;
  // Certifications
  certificationsLabel?: string;
  // Social
  socialLinks?: SocialLink[];
  // Copyright
  copyright?: string;
  // Logo
  logoImage?: string;
  tinaField?: string;
}

export function FooterNew({
  appTitle = "Tu salud en un solo lugar",
  appSubtitle = "Descarga la app",
  appImage = "/images/app-mockup.png",
  companyLinks = [],
  founders = [],
  resourceLinks = [],
  phone = "+52 1 55 9225 6335",
  email = "hola@choiz.com.mx",
  hoursLabel = "Lunes a Viernes",
  hoursValue = "07 a 22 hs",
  treatmentLinks = [],
  legalLinks = [],
  cofeprisCode = "COFEPRIS 2421055036X00214",
  certificationsLabel = "Aprobados y certificados por",
  socialLinks = [],
  copyright = "© CHOIZ XCALE HEALTH S.A de C.V.. Todos los derechos reservados.",
  logoImage = "/images/choiz-logo-gray.svg",
  tinaField,
}: FooterNewProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    company: true,
    founders: true,
    resources: true,
    contact: true,
    hours: true,
    treatments: true,
    legal: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getSocialIcon = (platform?: string) => {
    switch (platform?.toLowerCase()) {
      case "instagram":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#FCFCFD"/>
          </svg>
        );
      case "facebook":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" fill="#FCFCFD"/>
          </svg>
        );
      case "tiktok":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#FCFCFD"/>
          </svg>
        );
      case "linkedin":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" fill="#FCFCFD"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className={styles.footer} data-tina-field={tinaField}>
      {/* Desktop Layout */}
      <div className={styles.desktopLayout}>
        <div className={styles.container}>
          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* App Promo Card */}
            <div className={styles.appCard}>
              <div className={styles.appCardContent}>
                <div className={styles.appText}>
                  <p className={styles.appTitle}>{appTitle}</p>
                  <p className={styles.appSubtitle}>{appSubtitle}</p>
                </div>
                <div className={styles.storeButtons}>
                  <Image
                    src="/images/app-store-badge.svg"
                    alt="App Store"
                    width={72}
                    height={86}
                    className={styles.storeBadge}
                  />
                  <Image
                    src="/images/play-store-badge.svg"
                    alt="Play Store"
                    width={72}
                    height={85}
                    className={styles.storeBadge}
                  />
                </div>
              </div>
              {appImage && (
                <div className={styles.appImageWrapper}>
                  <Image
                    src={normalizeImageUrl(appImage)}
                    alt="App Choiz"
                    width={226}
                    height={290}
                    className={styles.appImage}
                  />
                </div>
              )}
            </div>

            {/* Links Columns */}
            <div className={styles.linksGrid}>
              {/* Column 1: Company, Founders, Resources */}
              <div className={styles.linksColumn}>
                <div className={styles.linkGroup}>
                  <span className={styles.linkLabel}>Compañía</span>
                  {companyLinks.map((link, i) => (
                    <Link key={i} href={link.url || "#"} className={styles.linkItem}>
                      {link.text}
                    </Link>
                  ))}
                </div>
                <div className={styles.linkGroup}>
                  <span className={styles.linkLabel}>Nuestros fundadores</span>
                  {founders.map((founder, i) => (
                    <span key={i} className={styles.linkItem}>
                      {founder.name}
                    </span>
                  ))}
                </div>
                <div className={styles.linkGroup}>
                  <span className={styles.linkLabel}>Recursos</span>
                  {resourceLinks.map((link, i) => (
                    <Link key={i} href={link.url || "#"} className={styles.linkItem}>
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: Contact, Hours, Treatments */}
              <div className={styles.linksColumn}>
                <div className={styles.linkGroup}>
                  <span className={styles.linkLabel}>Contáctanos</span>
                  <span className={styles.linkItem}>{phone}</span>
                  <span className={styles.linkItem}>{email}</span>
                </div>
                <div className={styles.linkGroup}>
                  <span className={styles.linkLabel}>Horario de atención</span>
                  <span className={styles.linkItem}>{hoursLabel}</span>
                  <span className={styles.linkItem}>{hoursValue}</span>
                </div>
                <div className={styles.linkGroup}>
                  <span className={styles.linkLabel}>Tratamientos</span>
                  {treatmentLinks.map((link, i) => (
                    <Link key={i} href={link.url || "#"} className={styles.linkItem}>
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: Legal, Certifications, Social */}
              <div className={styles.linksColumn}>
                <div className={styles.linkGroup}>
                  <span className={styles.linkLabel}>Legales</span>
                  {legalLinks.map((link, i) => (
                    <Link key={i} href={link.url || "#"} className={styles.linkItem}>
                      {link.text}
                    </Link>
                  ))}
                  <span className={styles.linkItem}>{cofeprisCode}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.linkGroup}>
                  <span className={styles.linkLabel}>{certificationsLabel}</span>
                  <div className={styles.certLogos}>
                    <Image
                      src="/images/cofepris.svg"
                      alt="COFEPRIS"
                      width={74}
                      height={17}
                    />
                    <div className={styles.certDivider} />
                    <Image
                      src="/images/profeco.svg"
                      alt="PROFECO"
                      width={60}
                      height={15}
                    />
                  </div>
                </div>
                <div className={styles.divider} />
                <div className={styles.socialAndCopyright}>
                  <div className={styles.socialLinks}>
                    {socialLinks.map((social, i) => (
                      <Link
                        key={i}
                        href={social.url || "#"}
                        className={styles.socialIcon}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getSocialIcon(social.platform)}
                      </Link>
                    ))}
                  </div>
                  <p className={styles.copyright}>{copyright}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className={styles.logoWrapper}>
            {logoImage && (
              <Image
                src={normalizeImageUrl(logoImage)}
                alt="Choiz"
                width={1056}
                height={325}
                className={styles.logo}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        <div className={styles.mobileContainer}>
          {/* App Promo Card */}
          <div className={styles.mobileAppCard}>
            <div className={styles.mobileAppHeader}>
              <p className={styles.mobileAppTitle}>{appTitle}</p>
              <p className={styles.mobileAppSubtitle}>APP de Choiz</p>
            </div>
            <button className={styles.mobileDownloadBtn}>Descargar ahora</button>
            {appImage && (
              <div className={styles.mobileAppImageWrapper}>
                <Image
                  src={normalizeImageUrl(appImage)}
                  alt="App Choiz"
                  width={243}
                  height={307}
                  className={styles.mobileAppImage}
                />
              </div>
            )}
          </div>

          {/* Accordion Sections */}
          <div className={styles.mobileAccordion}>
            {/* Company */}
            <div className={styles.mobileSection}>
              <button
                className={styles.mobileSectionHeader}
                onClick={() => toggleSection("company")}
              >
                <span className={styles.mobileSectionLabel}>Compañía</span>
                <span className={styles.mobileToggleIcon}>
                  {openSections.company ? "−" : "+"}
                </span>
              </button>
              {openSections.company && (
                <div className={styles.mobileSectionContent}>
                  {companyLinks.map((link, i) => (
                    <Link key={i} href={link.url || "#"} className={styles.mobileLinkItem}>
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}
              <div className={styles.mobileDivider} />
            </div>

            {/* Founders */}
            <div className={styles.mobileSection}>
              <button
                className={styles.mobileSectionHeader}
                onClick={() => toggleSection("founders")}
              >
                <span className={styles.mobileSectionLabel}>Nuestros fundadores</span>
                <span className={styles.mobileToggleIcon}>
                  {openSections.founders ? "−" : "+"}
                </span>
              </button>
              {openSections.founders && (
                <div className={styles.mobileSectionContent}>
                  {founders.map((founder, i) => (
                    <span key={i} className={styles.mobileLinkItem}>
                      {founder.name}
                    </span>
                  ))}
                </div>
              )}
              <div className={styles.mobileDivider} />
            </div>

            {/* Resources */}
            <div className={styles.mobileSection}>
              <button
                className={styles.mobileSectionHeader}
                onClick={() => toggleSection("resources")}
              >
                <span className={styles.mobileSectionLabel}>Recursos</span>
                <span className={styles.mobileToggleIcon}>
                  {openSections.resources ? "−" : "+"}
                </span>
              </button>
              {openSections.resources && (
                <div className={styles.mobileSectionContent}>
                  {resourceLinks.map((link, i) => (
                    <Link key={i} href={link.url || "#"} className={styles.mobileLinkItem}>
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}
              <div className={styles.mobileDivider} />
            </div>

            {/* Contact */}
            <div className={styles.mobileSection}>
              <button
                className={styles.mobileSectionHeader}
                onClick={() => toggleSection("contact")}
              >
                <span className={styles.mobileSectionLabel}>Contáctanos</span>
                <span className={styles.mobileToggleIcon}>
                  {openSections.contact ? "−" : "+"}
                </span>
              </button>
              {openSections.contact && (
                <div className={styles.mobileSectionContent}>
                  <span className={styles.mobileLinkItem}>{phone}</span>
                  <span className={styles.mobileLinkItem}>{email}</span>
                </div>
              )}
              <div className={styles.mobileDivider} />
            </div>

            {/* Hours */}
            <div className={styles.mobileSection}>
              <button
                className={styles.mobileSectionHeader}
                onClick={() => toggleSection("hours")}
              >
                <span className={styles.mobileSectionLabel}>Horario de atención</span>
                <span className={styles.mobileToggleIcon}>
                  {openSections.hours ? "−" : "+"}
                </span>
              </button>
              {openSections.hours && (
                <div className={styles.mobileSectionContent}>
                  <span className={styles.mobileLinkItem}>
                    {hoursLabel} de {hoursValue}
                  </span>
                </div>
              )}
              <div className={styles.mobileDivider} />
            </div>

            {/* Treatments */}
            <div className={styles.mobileSection}>
              <button
                className={styles.mobileSectionHeader}
                onClick={() => toggleSection("treatments")}
              >
                <span className={styles.mobileSectionLabel}>Tratamientos</span>
                <span className={styles.mobileToggleIcon}>
                  {openSections.treatments ? "−" : "+"}
                </span>
              </button>
              {openSections.treatments && (
                <div className={styles.mobileSectionContent}>
                  {treatmentLinks.map((link, i) => (
                    <Link key={i} href={link.url || "#"} className={styles.mobileLinkItem}>
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}
              <div className={styles.mobileDivider} />
            </div>

            {/* Legal */}
            <div className={styles.mobileSection}>
              <button
                className={styles.mobileSectionHeader}
                onClick={() => toggleSection("legal")}
              >
                <span className={styles.mobileSectionLabel}>Legales</span>
                <span className={styles.mobileToggleIcon}>
                  {openSections.legal ? "−" : "+"}
                </span>
              </button>
              {openSections.legal && (
                <div className={styles.mobileSectionContent}>
                  {legalLinks.map((link, i) => (
                    <Link key={i} href={link.url || "#"} className={styles.mobileLinkItem}>
                      {link.text}
                    </Link>
                  ))}
                  <span className={styles.mobileLinkItem}>{cofeprisCode}</span>
                </div>
              )}
              <div className={styles.mobileDivider} />
            </div>
          </div>

          {/* Certifications */}
          <div className={styles.mobileCertifications}>
            <span className={styles.mobileCertLabel}>{certificationsLabel}</span>
            <div className={styles.mobileCertLogos}>
              <Image
                src="/images/cofepris.svg"
                alt="COFEPRIS"
                width={111}
                height={26}
              />
              <div className={styles.mobileCertDivider} />
              <Image
                src="/images/profeco.svg"
                alt="PROFECO"
                width={90}
                height={20}
              />
            </div>
          </div>

          <div className={styles.mobileDivider} />

          {/* Social Links */}
          <div className={styles.mobileSocialLinks}>
            {socialLinks.map((social, i) => (
              <Link
                key={i}
                href={social.url || "#"}
                className={styles.mobileSocialIcon}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getSocialIcon(social.platform)}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className={styles.mobileCopyright}>{copyright}</p>

          {/* Logo */}
          <div className={styles.mobileLogoWrapper}>
            {logoImage && (
              <Image
                src={normalizeImageUrl(logoImage)}
                alt="Choiz"
                width={343}
                height={106}
                className={styles.mobileLogo}
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
