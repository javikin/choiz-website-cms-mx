"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Navbar } from "@/components/layout/Navbar";
import { NavbarMinimal } from "@/components/layout/NavbarMinimal";
import { ABTestWrapper } from "@/components/analytics";
import {
  Hero,
  Certifications,
  SuccessStories,
  Formulas,
  Activos,
  VideoTestimonials,
  HowItWorksNew,
  FAQ,
  FinalCtaNew,
  FooterNew,
} from "@/components/sections";
import type { PageQuery } from "../../tina/__generated__/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cleanArray<T>(arr: any[] | null | undefined): T[] | undefined {
  if (!arr) return undefined;
  return arr
    .filter((item) => item !== null && item !== undefined)
    .map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { __typename, ...rest } = item;
      const cleaned = Object.fromEntries(
        Object.entries(rest).map(([k, v]) => [k, v === null ? undefined : v])
      );
      return cleaned as T;
    });
}

interface PageClientProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PageQuery;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderSection(section: any, index: number, parentData: any) {
  let templateName = section._template;
  if (!templateName && section.__typename) {
    const extracted = section.__typename.replace("PageSections", "");
    templateName = extracted.charAt(0).toLowerCase() + extracted.slice(1);
  }

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

    case "certifications":
      return (
        <Certifications
          key={index}
          title={section.title || undefined}
          badges={cleanArray(section.badges)}
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

    default:
      console.warn(`Unknown section template: ${templateName}`);
      return null;
  }
}

export function PageClient(props: PageClientProps) {
  const { data: tinaData } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const data = tinaData.page;
  const sections = data?.sections || [];
  const navbarVariant = data?.navbar?.variant || "default";
  const pageSlug = props.variables.relativePath.replace(".json", "");

  const abTestConfig = data?.abTest
    ? {
        testId: data.abTest.testId || undefined,
        variant: data.abTest.variant || undefined,
        trafficPercentage: data.abTest.trafficPercentage || undefined,
        isActive: data.abTest.isActive || undefined,
        startDate: data.abTest.startDate || undefined,
        endDate: data.abTest.endDate || undefined,
      }
    : undefined;

  return (
    <ABTestWrapper abTest={abTestConfig} pageSlug={pageSlug}>
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
    </ABTestWrapper>
  );
}
