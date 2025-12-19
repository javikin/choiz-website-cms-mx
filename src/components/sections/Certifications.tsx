"use client";

import Image from "next/image";
import styles from "./Certifications.module.css";

// ============================================
// TYPES
// ============================================

interface CertificationsProps {
  title?: string;
  licenseNumber?: string;
  tinaField?: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Certifications({
  title = "Aprobados y certificados por",
  licenseNumber = "Licencia N° 09014110009",
  tinaField,
}: CertificationsProps) {
  return (
    <section
      className="bg-white py-8"
      data-tina-field={tinaField}
    >
      {/* Desktop Layout */}
      <div className={styles.desktopLayout}>
        {/* Title */}
        <p className="text-[18px] leading-[22px] text-[#B1B1B1] font-normal whitespace-nowrap">
          {title}
        </p>

        {/* Logos Container */}
        <div className="flex items-center gap-10">
          {/* COFEPRIS */}
          <div className="h-[59px] flex items-center">
            <Image
              src="/images/cofepris.svg"
              alt="COFEPRIS - Comisión Federal para la Protección contra Riesgos Sanitarios"
              width={246}
              height={59}
              className="h-[59px] w-auto object-contain"
            />
          </div>

          {/* PROFECO */}
          <div className="h-[64px] flex items-center">
            <Image
              src="/images/profeco.svg"
              alt="PROFECO - Procuraduría Federal del Consumidor"
              width={161}
              height={64}
              className="h-[64px] w-auto object-contain"
            />
          </div>

          {/* Distintivo Digital */}
          <div className="h-[50px] flex items-center">
            <Image
              src="/images/distintivo.svg"
              alt="Distintivo Digital"
              width={195}
              height={50}
              className="h-[50px] w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        {/* Title */}
        <p className="text-[14px] leading-[17px] text-[#7D7D7D] font-normal text-center">
          {title}
        </p>

        {/* Logos and License Container */}
        <div className="flex flex-col items-center gap-3">
          {/* Logos Row */}
          <div className="flex items-center justify-center gap-5 w-[302px]">
            {/* COFEPRIS */}
            <div className="h-[28px] flex items-center">
              <Image
                src="/images/cofepris.svg"
                alt="COFEPRIS"
                width={120}
                height={28}
                className="h-[28px] w-auto object-contain"
              />
            </div>

            {/* PROFECO */}
            <div className="h-[20px] flex items-center">
              <Image
                src="/images/profeco.svg"
                alt="PROFECO"
                width={97}
                height={20}
                className="h-[20px] w-auto object-contain"
              />
            </div>
          </div>

          {/* License Number */}
          <p className="text-[10px] leading-[15px] text-[#B1B1B1] font-normal">
            {licenseNumber}
          </p>
        </div>
      </div>
    </section>
  );
}
