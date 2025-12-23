"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Navbar } from "@/components/layout/Navbar";
import { NavbarMinimal } from "@/components/layout/NavbarMinimal";
import {
  Hero,
  HeroVideo,
  Certifications,
  Testimonials,
  Problem,
  Products,
  Ingredients,
  Effectiveness,
  WhyChoose,
  Guarantee,
  GuaranteeNew,
  HowItWorks,
  FinalCta,
  Footer,
  SuccessStories,
  Formulas,
  Activos,
  VideoTestimonials,
  HowItWorksNew,
  FinalCtaNew,
  FAQ,
  FooterNew,
  Stats,
  CtaTimer,
  PressLogos,
  ProductComparison,
  BeforeAfter,
  Benefits,
  Reviews,
} from "@/components/sections";
import type { PageQuery } from "../../tina/__generated__/types";

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

interface PageClientProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PageQuery;
}

// Section renderer - renders the appropriate component based on _template
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderSection(section: any, index: number, parentData: any) {
  // Get template name from _template or __typename
  // Note: _template comes as-is (e.g., "hero"), __typename comes as "PageSectionsHero"
  let templateName = section._template;
  if (!templateName && section.__typename) {
    // Extract the template name and convert first letter to lowercase
    const extracted = section.__typename.replace("PageSections", "");
    templateName = extracted.charAt(0).toLowerCase() + extracted.slice(1);
  }

  // Generate tinaField for this section using parent data
  const sectionTinaField = tinaField(parentData, "sections", index);

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
          backgroundImageMobile={section.backgroundImageMobile || undefined}
          tinaField={sectionTinaField}
        />
      );

    case "heroVideo":
      return (
        <HeroVideo
          key={index}
          variant={section.variant || undefined}
          badge={section.badge || undefined}
          headline={section.headline || undefined}
          subheadline={section.subheadline || undefined}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
          videoUrl={section.videoUrl || undefined}
          posterImage={section.posterImage || undefined}
          tinaField={sectionTinaField}
        />
      );

    case "certifications":
      return (
        <Certifications
          key={index}
          title={section.title || undefined}
          badges={cleanArray(section.badges)}
          tinaField={sectionTinaField}
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
          tinaField={sectionTinaField}
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
          tinaField={sectionTinaField}
        />
      );

    case "products":
      return (
        <Products
          key={index}
          headline={section.headline || undefined}
          items={cleanArray(section.items)}
          tinaField={sectionTinaField}
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
          tinaField={sectionTinaField}
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
          tinaField={sectionTinaField}
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
          tinaField={sectionTinaField}
        />
      );

    case "guarantee":
      return (
        <Guarantee
          key={index}
          days={section.days || undefined}
          headline={section.headline || undefined}
          description={section.description || undefined}
          tinaField={sectionTinaField}
        />
      );

    case "guaranteeNew":
      return (
        <GuaranteeNew
          key={index}
          days={section.days || undefined}
          headline={section.headline || undefined}
          description={section.description || undefined}
          variant={section.variant || undefined}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
          termsLink={section.termsLink || undefined}
          tinaField={sectionTinaField}
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
          tinaField={sectionTinaField}
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
          tinaField={sectionTinaField}
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
          tinaField={sectionTinaField}
        />
      );

    case "formulas":
      return (
        <Formulas
          key={index}
          headline={section.headline || undefined}
          highlightText={section.highlightText || undefined}
          formulas={cleanArray(section.formulas)}
          tinaField={sectionTinaField}
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
          tinaField={sectionTinaField}
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
          tinaField={sectionTinaField}
        />
      );

    case "howItWorksNew":
      return (
        <HowItWorksNew
          key={index}
          headline={section.headline || undefined}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
          steps={cleanArray(section.steps)}
          tinaField={sectionTinaField}
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
          tinaField={sectionTinaField}
        />
      );

    case "faq":
      return (
        <FAQ
          key={index}
          headline={section.headline || undefined}
          highlightText={section.highlightText || undefined}
          items={cleanArray(section.items)}
          tinaField={sectionTinaField}
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
          tinaField={sectionTinaField}
        />
      );

    case "stats":
      return (
        <Stats
          key={index}
          headline={section.headline || undefined}
          variant={section.variant || undefined}
          stats={cleanArray(section.stats)}
          tinaField={sectionTinaField}
        />
      );

    case "ctaTimer":
      return (
        <CtaTimer
          key={index}
          variant={section.variant || undefined}
          headline={section.headline || undefined}
          subheadline={section.subheadline || undefined}
          endDate={section.endDate || undefined}
          ctaText={section.ctaText || undefined}
          ctaLink={section.ctaLink || undefined}
          limitedText={section.limitedText || undefined}
          tinaField={sectionTinaField}
        />
      );

    case "pressLogos":
      return (
        <PressLogos
          key={index}
          headline={section.headline || undefined}
          variant={section.variant || undefined}
          logos={cleanArray(section.logos)}
          tinaField={sectionTinaField}
        />
      );

    case "productComparison":
      return (
        <ProductComparison
          key={index}
          headline={section.headline || undefined}
          variant={section.variant || undefined}
          products={cleanArray(section.products)}
          features={cleanArray(section.features)}
          tinaField={sectionTinaField}
        />
      );

    case "beforeAfter":
      return (
        <BeforeAfter
          key={index}
          headline={section.headline || undefined}
          subheadline={section.subheadline || undefined}
          variant={section.variant || undefined}
          cases={cleanArray(section.cases)}
          tinaField={sectionTinaField}
        />
      );

    case "benefits":
      return (
        <Benefits
          key={index}
          headline={section.headline || undefined}
          subheadline={section.subheadline || undefined}
          variant={section.variant || undefined}
          competitorName={section.competitorName || undefined}
          benefits={cleanArray(section.benefits)}
          tinaField={sectionTinaField}
        />
      );

    case "reviews":
      return (
        <Reviews
          key={index}
          headline={section.headline || undefined}
          variant={section.variant || undefined}
          averageRating={section.averageRating || undefined}
          totalReviews={section.totalReviews || undefined}
          breakdown={cleanArray(section.breakdown)}
          reviews={cleanArray(section.reviews)}
          tinaField={sectionTinaField}
        />
      );

    default:
      console.warn(`Unknown section template: ${templateName}`);
      return null;
  }
}

export function PageClient(props: PageClientProps) {
  // useTina enables real-time updates in the visual editor
  const { data: tinaData } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const data = tinaData.page;
  const sections = data?.sections || [];

  // Determine which navbar variant to render
  const navbarVariant = data?.navbar?.variant || "default";

  return (
    <>
      {navbarVariant === "minimal" ? (
        <NavbarMinimal
          logo={data?.navbar?.logo || undefined}
          loginLink={data?.navbar?.loginLink || undefined}
          tinaField={data?.navbar ? tinaField(data, "navbar") : undefined}
        />
      ) : (
        <Navbar
          logo={data?.navbar?.logo || undefined}
          ctaText={data?.navbar?.ctaText || undefined}
          ctaLink={data?.navbar?.ctaLink || undefined}
          tinaField={data?.navbar ? tinaField(data, "navbar") : undefined}
        />
      )}

      <main>
        {sections.map((section, index) =>
          section ? renderSection(section, index, data) : null
        )}
      </main>

      {data?.footer && (
        <Footer
          socialLinks={cleanArray(data?.footer?.socialLinks)}
          logo={data?.footer?.logo || undefined}
          copyright={data?.footer?.copyright || undefined}
          certifications={cleanArray(data?.footer?.certifications)}
          legalLinks={cleanArray(data?.footer?.legalLinks)}
          resourceLinks={cleanArray(data?.footer?.resourceLinks)}
          founders={cleanArray(data?.footer?.founders)}
          contact={cleanObject(data?.footer?.contact)}
          companyLinks={cleanArray(data?.footer?.companyLinks)}
          tinaField={tinaField(data, "footer")}
        />
      )}
    </>
  );
}
