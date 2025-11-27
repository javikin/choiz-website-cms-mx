"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";

// ============================================
// TYPES
// ============================================

interface SocialLink {
  platform?: string;
  url?: string;
}

interface LinkItem {
  text?: string;
  url?: string;
}

interface Founder {
  name?: string;
}

interface Certification {
  logo?: string;
  label?: string;
}

interface Contact {
  phone?: string;
  email?: string;
  hours?: string;
}

interface FooterProps {
  socialLinks?: SocialLink[];
  logo?: string;
  copyright?: string;
  certifications?: Certification[];
  legalLinks?: LinkItem[];
  resourceLinks?: LinkItem[];
  founders?: Founder[];
  contact?: Contact;
  companyLinks?: LinkItem[];
  tinaField?: string;
}

// ============================================
// SUB-COMPONENTS
// ============================================

// TikTok Icon (custom SVG)
function TikTokIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

// Social icon mapping
const SOCIAL_ICONS: Record<string, React.ElementType> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  tiktok: TikTokIcon,
};

// Social Link Button
function SocialLinkButton({ social }: { social: SocialLink }) {
  const platform = social.platform?.toLowerCase() || "";
  const Icon = SOCIAL_ICONS[platform];

  return (
    <a
      href={social.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[56px] h-[56px] rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center transition-colors"
      aria-label={social.platform}
    >
      {Icon ? (
        <Icon className="w-5 h-5" />
      ) : (
        <span className="text-xs">{platform.charAt(0).toUpperCase()}</span>
      )}
    </a>
  );
}

// Social Links Row
function SocialLinksRow({ socialLinks }: { socialLinks: SocialLink[] }) {
  return (
    <div className="flex gap-8 mb-[72px]">
      {socialLinks.map((social, index) => (
        <SocialLinkButton key={index} social={social} />
      ))}
    </div>
  );
}

// Footer Logo
function FooterLogo({ src }: { src: string }) {
  return (
    <div className="mb-6">
      <Image
        src={src}
        alt="Choiz"
        width={134}
        height={41}
        className="h-10 w-auto brightness-0 invert"
      />
    </div>
  );
}

// Copyright Text
function CopyrightText({ text }: { text: string }) {
  return (
    <p className="text-sm text-gray-400 mb-8 leading-relaxed">{text}</p>
  );
}

// Certification Image
function CertificationImage({ cert }: { cert: Certification }) {
  if (!cert.logo) return null;
  return (
    <Image
      src={cert.logo}
      alt={cert.label || "Certificación"}
      width={114}
      height={27}
      className="h-7 w-auto opacity-60"
    />
  );
}

// Certification Placeholder
function CertificationPlaceholder() {
  return <div className="h-7 w-[114px] bg-gray-700 rounded" />;
}

// Certifications Row
function CertificationsRow({ certifications }: { certifications: Certification[] }) {
  if (certifications.length > 0) {
    return (
      <div className="flex gap-6">
        {certifications.map((cert, index) => (
          <div key={index}>
            <CertificationImage cert={cert} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex gap-6">
      <CertificationPlaceholder />
      <CertificationPlaceholder />
    </div>
  );
}

// Left Column (Logo, Copyright, Certifications)
function LeftColumn({
  logo,
  copyright,
  certifications,
}: {
  logo: string;
  copyright: string;
  certifications: Certification[];
}) {
  return (
    <div>
      <FooterLogo src={logo} />
      <CopyrightText text={copyright} />
      <CertificationsRow certifications={certifications} />
    </div>
  );
}

// Link List Section Title
function LinkListTitle({ title }: { title: string }) {
  return <h4 className="text-sm font-medium mb-6">{title}</h4>;
}

// Single Link Item
function LinkListItem({ link }: { link: LinkItem }) {
  return (
    <li>
      <Link
        href={link.url || "#"}
        className="text-sm text-gray-400 hover:text-white transition-colors"
      >
        {link.text}
      </Link>
    </li>
  );
}

// Link List
function LinkList({ links }: { links: LinkItem[] }) {
  return (
    <ul className="space-y-4">
      {links.map((link, index) => (
        <LinkListItem key={index} link={link} />
      ))}
    </ul>
  );
}

// Legal Links Column
function LegalLinksColumn({ links }: { links: LinkItem[] }) {
  return (
    <div>
      <LinkListTitle title="Legales" />
      <LinkList links={links} />
    </div>
  );
}

// Founders Section
function FoundersSection({ founders }: { founders: Founder[] }) {
  if (founders.length === 0) return null;
  return (
    <>
      <h4 className="text-sm font-medium mb-4">Nuestros fundadores</h4>
      <ul className="space-y-4">
        {founders.map((founder, index) => (
          <li key={index} className="text-sm text-gray-400">
            {founder.name}
          </li>
        ))}
      </ul>
    </>
  );
}

// Resources & Founders Column
function ResourcesColumn({
  resourceLinks,
  founders,
}: {
  resourceLinks: LinkItem[];
  founders: Founder[];
}) {
  return (
    <div>
      <LinkListTitle title="Recursos" />
      <ul className="space-y-4 mb-8">
        {resourceLinks.map((link, index) => (
          <LinkListItem key={index} link={link} />
        ))}
      </ul>
      <FoundersSection founders={founders} />
    </div>
  );
}

// Contact Info List
function ContactInfoList({ contact }: { contact: Contact }) {
  return (
    <ul className="space-y-4 text-sm text-gray-400">
      {contact.phone && <li>{contact.phone}</li>}
      {contact.email && (
        <li>
          <a
            href={`mailto:${contact.email}`}
            className="hover:text-white transition-colors"
          >
            {contact.email}
          </a>
        </li>
      )}
    </ul>
  );
}

// Contact Hours
function ContactHours({ hours }: { hours?: string }) {
  if (!hours) return null;
  return (
    <div className="mt-8">
      <h4 className="text-sm font-medium mb-4">Horario de atención</h4>
      <p className="text-sm text-gray-400 leading-relaxed">{hours}</p>
    </div>
  );
}

// Contact Column
function ContactColumn({ contact }: { contact?: Contact }) {
  if (!contact) return null;
  return (
    <div>
      <LinkListTitle title="Contáctanos" />
      <ContactInfoList contact={contact} />
      <ContactHours hours={contact.hours} />
    </div>
  );
}

// Company Links Column
function CompanyColumn({ links }: { links: LinkItem[] }) {
  return (
    <div>
      <LinkListTitle title="Compañía" />
      <LinkList links={links} />
    </div>
  );
}

// Right Column Links Grid
function RightColumnGrid({
  legalLinks,
  resourceLinks,
  founders,
  contact,
  companyLinks,
}: {
  legalLinks: LinkItem[];
  resourceLinks: LinkItem[];
  founders: Founder[];
  contact?: Contact;
  companyLinks: LinkItem[];
}) {
  return (
    <div className="grid grid-cols-4 gap-8">
      <LegalLinksColumn links={legalLinks} />
      <ResourcesColumn resourceLinks={resourceLinks} founders={founders} />
      <ContactColumn contact={contact} />
      <CompanyColumn links={companyLinks} />
    </div>
  );
}

// Main Footer Grid
function MainFooterGrid({
  logo,
  copyright,
  certifications,
  legalLinks,
  resourceLinks,
  founders,
  contact,
  companyLinks,
}: {
  logo: string;
  copyright: string;
  certifications: Certification[];
  legalLinks: LinkItem[];
  resourceLinks: LinkItem[];
  founders: Founder[];
  contact?: Contact;
  companyLinks: LinkItem[];
}) {
  return (
    <div className="grid lg:grid-cols-[264px_1fr] gap-[32px]">
      <LeftColumn
        logo={logo}
        copyright={copyright}
        certifications={certifications}
      />
      <RightColumnGrid
        legalLinks={legalLinks}
        resourceLinks={resourceLinks}
        founders={founders}
        contact={contact}
        companyLinks={companyLinks}
      />
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function Footer({
  socialLinks = [
    { platform: "Facebook", url: "#" },
    { platform: "Instagram", url: "#" },
    { platform: "TikTok", url: "#" },
    { platform: "YouTube", url: "#" },
    { platform: "LinkedIn", url: "#" },
  ],
  logo = "/images/choiz-logo.svg",
  copyright = "© CHOIZ XCALE HEALTH S.A de C.V. Todos los derechos reservados.",
  certifications = [],
  legalLinks = [
    { text: "Políticas de privacidad", url: "/privacidad" },
    { text: "Términos y condiciones", url: "/terminos" },
    { text: "Consentimiento de Telemedicina", url: "/telemedicina" },
    { text: "COFEPRIS 2421055036X00214", url: "#" },
  ],
  resourceLinks = [
    { text: "Blog", url: "/blog" },
    { text: "Preguntas frecuentes", url: "/faq" },
  ],
  founders = [
    { name: "Franco Lacrampette" },
    { name: "Ignacio D'Anunzio" },
  ],
  contact = {
    phone: "+52 1 55 9225 6335",
    email: "hola@choiz.com.mx",
    hours: "Lunes a Viernes 07 a 22 hs",
  },
  companyLinks = [
    { text: "Sobre nosotros", url: "/sobre-nosotros" },
    { text: "Trabaja con nosotros", url: "/carreras" },
  ],
  tinaField,
}: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-[72px]" data-tina-field={tinaField}>
      <div className="max-w-[1280px] mx-auto px-[72px]">
        <SocialLinksRow socialLinks={socialLinks} />
        <MainFooterGrid
          logo={logo}
          copyright={copyright}
          certifications={certifications}
          legalLinks={legalLinks}
          resourceLinks={resourceLinks}
          founders={founders}
          contact={contact}
          companyLinks={companyLinks}
        />
      </div>
    </footer>
  );
}
