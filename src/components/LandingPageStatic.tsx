import { Navbar } from "@/components/layout/Navbar";
import {
  Hero,
  Certifications,
  SuccessStories,
  Formulas,
  Activos,
  VideoTestimonials,
  Testimonials,
  Problem,
  Products,
  Ingredients,
  Effectiveness,
  WhyChoose,
  Guarantee,
  HowItWorks,
  HowItWorksNew,
  FinalCta,
  FinalCtaNew,
  FAQ,
  FooterNew,
  Footer,
} from "@/components/sections";
import type { LandingQuery } from "../../tina/__generated__/types";

// Helper to clean TinaCMS data (remove nulls and __typename)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cleanArray<T>(arr: any[] | null | undefined): T[] | undefined {
  if (!arr) return undefined;
  return arr
    .filter((item) => item !== null && item !== undefined)
    .map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { __typename, ...rest } = item;
      // Convert null values to undefined
      const cleaned = Object.fromEntries(
        Object.entries(rest).map(([k, v]) => [k, v === null ? undefined : v])
      );
      return cleaned as T;
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cleanObject<T>(obj: any | null | undefined): T | undefined {
  if (!obj) return undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __typename, ...rest } = obj;
  const cleaned = Object.fromEntries(
    Object.entries(rest).map(([k, v]) => [k, v === null ? undefined : v])
  );
  return cleaned as T;
}

interface LandingPageStaticProps {
  data: LandingQuery;
}

// Section renderer - renders the appropriate component based on _template
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderSection(section: any, index: number) {
  // Get template name from _template or __typename
  let templateName = section._template;
  if (!templateName && section.__typename) {
    const extracted = section.__typename.replace("LandingSections", "");
    templateName = extracted.charAt(0).toLowerCase() + extracted.slice(1);
  }

  switch (templateName) {
    case "hero":
      return (
        <Hero
          key={index}
          badge={section.badge || undefined}
          headline={section.headline || undefined}
          benefits={cleanArray(section.benefits)}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
          priceText={section.priceText || undefined}
          backgroundImage={section.backgroundImage || undefined}
        />
      );

    case "certifications":
      return (
        <Certifications
          key={index}
          title={section.title || undefined}
          badges={cleanArray(section.badges)}
        />
      );

    case "successStories":
      return (
        <SuccessStories
          key={index}
          highlightText={section.highlightText || undefined}
          normalText={section.normalText || undefined}
          ctaPrimaryText={section.ctaPrimaryText || undefined}
          ctaPrimaryLink={section.ctaPrimaryLink || undefined}
          ctaSecondaryText={section.ctaSecondaryText || undefined}
          ctaSecondaryLink={section.ctaSecondaryLink || undefined}
          testimonials={cleanArray(section.testimonials)}
        />
      );

    case "formulas":
      return (
        <Formulas
          key={index}
          headline={section.headline || undefined}
          highlightText={section.highlightText || undefined}
          formulas={cleanArray(section.formulas)}
        />
      );

    case "activos":
      return (
        <Activos
          key={index}
          headline={section.headline || undefined}
          highlightText={section.highlightText || undefined}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
          activos={cleanArray(section.activos)}
        />
      );

    case "videoTestimonials":
      return (
        <VideoTestimonials
          key={index}
          headline={section.headline || undefined}
          highlightText={section.highlightText || undefined}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
          videos={cleanArray(section.videos)}
        />
      );

    case "testimonials":
      return (
        <Testimonials
          key={index}
          headline={section.headline || undefined}
          subheadline={section.subheadline || undefined}
          videos={cleanArray(section.videos)}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
          moreText={section.moreText || undefined}
          moreLink={section.moreLink || undefined}
        />
      );

    case "problem":
      return (
        <Problem
          key={index}
          headline={section.headline || undefined}
          stat={section.stat || undefined}
          statDescription={section.statDescription || undefined}
          explanation={section.explanation || undefined}
          illustration={section.illustration || undefined}
          hairLossTypes={cleanArray(section.hairLossTypes)}
        />
      );

    case "products":
      return (
        <Products
          key={index}
          headline={section.headline || undefined}
          items={cleanArray(section.items)}
        />
      );

    case "ingredients":
      return (
        <Ingredients
          key={index}
          headline={section.headline || undefined}
          items={cleanArray(section.items)}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
        />
      );

    case "effectiveness":
      return (
        <Effectiveness
          key={index}
          headline={section.headline || undefined}
          chartTitle={section.chartTitle || undefined}
          stats={cleanArray(section.stats)}
          conclusion={section.conclusion || undefined}
          sourcesTitle={section.sourcesTitle || undefined}
          sources={section.sources || undefined}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
        />
      );

    case "whyChoose":
      return (
        <WhyChoose
          key={index}
          headline={section.headline || undefined}
          valueProps={cleanArray(section.valueProps)}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
        />
      );

    case "guarantee":
      return (
        <Guarantee
          key={index}
          days={section.days || undefined}
          headline={section.headline || undefined}
          description={section.description || undefined}
        />
      );

    case "howItWorks":
      return (
        <HowItWorks
          key={index}
          headline={section.headline || undefined}
          steps={cleanArray(section.steps)}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
        />
      );

    case "howItWorksNew":
      return (
        <HowItWorksNew
          key={index}
          headline={section.headline || undefined}
          steps={cleanArray(section.steps)}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
        />
      );

    case "finalCta":
      return (
        <FinalCta
          key={index}
          headline={section.headline || undefined}
          subheadline={section.subheadline || undefined}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
        />
      );

    case "finalCtaNew":
      return (
        <FinalCtaNew
          key={index}
          headline={section.headline || undefined}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
          backgroundImage={section.backgroundImage || undefined}
        />
      );

    case "faq":
      return (
        <FAQ
          key={index}
          headline={section.headline || undefined}
          highlightText={section.highlightText || undefined}
          items={cleanArray(section.items)}
        />
      );

    case "footerNew":
      return (
        <FooterNew
          key={index}
          appTitle={section.appTitle || undefined}
          appSubtitle={section.appSubtitle || undefined}
          appImage={section.appImage || undefined}
          companyLinks={cleanArray(section.companyLinks)}
          founders={cleanArray(section.founders)}
          resourceLinks={cleanArray(section.resourceLinks)}
          phone={section.phone || undefined}
          email={section.email || undefined}
          hoursLabel={section.hoursLabel || undefined}
          hoursValue={section.hoursValue || undefined}
          treatmentLinks={cleanArray(section.treatmentLinks)}
          legalLinks={cleanArray(section.legalLinks)}
          cofeprisCode={section.cofeprisCode || undefined}
          socialLinks={cleanArray(section.socialLinks)}
          copyright={section.copyright || undefined}
          logoImage={section.logoImage || undefined}
        />
      );

    default:
      console.warn(`Unknown section template: ${templateName}`);
      return null;
  }
}

/**
 * LandingPageStatic renders the landing page without TinaCMS client-side code.
 * Used for production builds to reduce bundle size and improve performance.
 */
export function LandingPageStatic({ data }: LandingPageStaticProps) {
  const landing = data.landing;
  const sections = landing?.sections || [];

  return (
    <>
      <Navbar
        logo={landing?.navbar?.logo || undefined}
        ctaText={landing?.navbar?.ctaText || undefined}
        ctaLink={landing?.navbar?.ctaLink || undefined}
      />

      <main>
        {sections.map((section, index) =>
          section ? renderSection(section, index) : null
        )}
      </main>

{/* Footer temporalmente deshabilitado
      <Footer
        socialLinks={cleanArray(landing?.footer?.socialLinks)}
        logo={landing?.footer?.logo || undefined}
        copyright={landing?.footer?.copyright || undefined}
        certifications={cleanArray(landing?.footer?.certifications)}
        legalLinks={cleanArray(landing?.footer?.legalLinks)}
        resourceLinks={cleanArray(landing?.footer?.resourceLinks)}
        founders={cleanArray(landing?.footer?.founders)}
        contact={cleanObject(landing?.footer?.contact)}
        companyLinks={cleanArray(landing?.footer?.companyLinks)}
      />
      */}
    </>
  );
}
