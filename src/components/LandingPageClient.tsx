"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Navbar } from "@/components/layout/Navbar";
import {
  Hero,
  Certifications,
  Testimonials,
  Problem,
  Products,
  Ingredients,
  Effectiveness,
  WhyChoose,
  Guarantee,
  HowItWorks,
  FinalCta,
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

interface LandingPageClientProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: LandingQuery;
}

// Section renderer - renders the appropriate component based on _template
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderSection(section: any, index: number, parentData: any) {
  // Get template name from _template or __typename
  // Note: _template comes as-is (e.g., "hero"), __typename comes as "LandingSectionsHero"
  let templateName = section._template;
  if (!templateName && section.__typename) {
    // Extract the template name and convert first letter to lowercase
    const extracted = section.__typename.replace("LandingSections", "");
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
          backgroundImage={section.backgroundImage || undefined}
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

    default:
      console.warn(`Unknown section template: ${templateName}`);
      return null;
  }
}

export function LandingPageClient(props: LandingPageClientProps) {
  // useTina enables real-time updates in the visual editor
  const { data: tinaData } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const data = tinaData.landing;
  const sections = data?.sections || [];

  return (
    <>
      <Navbar
        logo={data?.navbar?.logo || undefined}
        ctaText={data?.navbar?.ctaText || undefined}
        ctaLink={data?.navbar?.ctaLink || undefined}
        tinaField={data?.navbar ? tinaField(data, "navbar") : undefined}
      />

      <main>
        {sections.map((section, index) =>
          section ? renderSection(section, index, data) : null
        )}
      </main>

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
        tinaField={data?.footer ? tinaField(data, "footer") : undefined}
      />
    </>
  );
}
