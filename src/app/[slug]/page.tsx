import { notFound } from "next/navigation";
import client from "../../../tina/__generated__/client";
import type { Metadata } from "next";

// GraphQL query for page collection - mirrors the landing query structure
const query = `query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    ... on Document {
      _sys { filename basename breadcrumbs path relativePath extension }
      id
    }
    __typename
    title
    status
    seo { __typename metaTitle metaDescription ogImage ogType canonicalUrl noIndex }
    navbar { __typename variant logo ctaText ctaLink loginLink }
    sections {
      __typename
      ... on PageSectionsHero {
        badge
        headline
        benefits { __typename text }
        ctaText
        ctaLink
        priceText
        backgroundImage
      }
      ... on PageSectionsHeroVideo {
        variant
        badge
        headline
        subheadline
        ctaText
        ctaLink
        videoUrl
        posterImage
      }
      ... on PageSectionsCertifications {
        title
        badges { __typename logo label }
      }
      ... on PageSectionsTestimonials {
        headline
        subheadline
        videos { __typename name backgroundImage videoUrl rating productName productDescription productImage }
        ctaText
        ctaLink
        moreText
        moreLink
      }
      ... on PageSectionsProblem {
        headline
        stat
        statDescription
        explanation
        illustration
        hairLossTypes { __typename name icon }
      }
      ... on PageSectionsProducts {
        headline
        items { __typename name tags { __typename text } image selectText moreText link }
      }
      ... on PageSectionsIngredients {
        headline
        items { __typename name description image }
        ctaText
        ctaLink
      }
      ... on PageSectionsEffectiveness {
        headline
        chartTitle
        stats { __typename label percentage }
        conclusion
        sourcesTitle
        sources
        ctaText
        ctaLink
      }
      ... on PageSectionsWhyChoose {
        headline
        valueProps { __typename title description icon }
        ctaText
        ctaLink
      }
      ... on PageSectionsGuarantee {
        days
        headline
        description
      }
      ... on PageSectionsGuaranteeNew {
        days
        headline
        description
        variant
        ctaText
        ctaLink
        termsLink
      }
      ... on PageSectionsHowItWorks {
        headline
        steps { __typename title description icon }
        ctaText
        ctaLink
      }
      ... on PageSectionsFinalCta {
        headline
        subheadline
        ctaText
        ctaLink
      }
      ... on PageSectionsSuccessStories {
        highlightText
        normalText
        ctaPrimaryText
        ctaPrimaryLink
        ctaSecondaryText
        ctaSecondaryLink
        testimonials { __typename name age quote beforeImage afterImage monthsBefore monthsAfter }
      }
      ... on PageSectionsFormulas {
        headline
        highlightText
        formulas { __typename name image tags { __typename text variant } ctaText ctaLink }
      }
      ... on PageSectionsActivos {
        headline
        highlightText
        ctaText
        ctaLink
        activos { __typename name description image }
      }
      ... on PageSectionsVideoTestimonials {
        headline
        highlightText
        ctaText
        ctaLink
        videos { __typename name backgroundImage videoUrl }
      }
      ... on PageSectionsHowItWorksNew {
        headline
        ctaText
        ctaLink
        steps { __typename title description image }
      }
      ... on PageSectionsFinalCtaNew {
        headline
        ctaText
        ctaLink
        backgroundImage
      }
      ... on PageSectionsFaq {
        headline
        highlightText
        items { __typename question answer }
      }
      ... on PageSectionsFooterNew {
        appTitle
        appSubtitle
        appImage
        companyLinks { __typename text url }
        founders { __typename name }
        resourceLinks { __typename text url }
        phone
        email
        hoursLabel
        hoursValue
        treatmentLinks { __typename text url }
        legalLinks { __typename text url }
        cofeprisCode
        socialLinks { __typename platform url }
        copyright
        logoImage
      }
      ... on PageSectionsStats {
        headline
        variant
        stats { __typename value label icon }
      }
      ... on PageSectionsCtaTimer {
        variant
        headline
        subheadline
        endDate
        ctaText
        ctaLink
        limitedText
      }
      ... on PageSectionsPressLogos {
        headline
        variant
        logos { __typename image name url }
      }
      ... on PageSectionsProductComparison {
        headline
        variant
        products { __typename name price priceNote ctaText ctaLink isRecommended }
        features { __typename name included { __typename value } }
      }
      ... on PageSectionsBeforeAfter {
        headline
        subheadline
        variant
        cases { __typename beforeImage afterImage name duration product testimonial }
      }
      ... on PageSectionsBenefits {
        headline
        subheadline
        variant
        competitorName
        benefits { __typename icon title description competitorHas }
      }
      ... on PageSectionsReviews {
        headline
        variant
        averageRating
        totalReviews
        breakdown { __typename stars percentage }
        reviews { __typename name date rating text productName }
      }
    }
    footer { __typename socialLinks { __typename platform url } logo copyright certifications { __typename logo label } legalLinks { __typename text url } resourceLinks { __typename text url } founders { __typename name } contact { __typename phone email hours } companyLinks { __typename text url } }
  }
}`;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const result = await client.queries.page({ relativePath: `${slug}.json` });
    const page = result.data.page;

    return {
      title: page?.seo?.metaTitle || page?.title || "Choiz",
      description: page?.seo?.metaDescription || undefined,
      openGraph: {
        title: page?.seo?.metaTitle || page?.title || "Choiz",
        description: page?.seo?.metaDescription || undefined,
        images: page?.seo?.ogImage ? [page.seo.ogImage] : undefined,
        type: (page?.seo?.ogType as "website" | "article") || "website",
      },
      alternates: {
        canonical: page?.seo?.canonicalUrl || undefined,
      },
      robots: page?.seo?.noIndex ? { index: false } : undefined,
    };
  } catch {
    return {
      title: "Pagina no encontrada",
    };
  }
}

// Generate static params for all published pages
export async function generateStaticParams() {
  try {
    const pagesResponse = await client.queries.pageConnection();
    const pages = pagesResponse.data.pageConnection.edges || [];

    return pages
      .filter((edge) => edge?.node?.status === "published")
      .map((edge) => ({
        slug: edge?.node?._sys.filename || "",
      }))
      .filter((p) => p.slug);
  } catch {
    return [];
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const variables = { relativePath: `${slug}.json` };

  try {
    const result = await client.queries.page(variables);

    // Check if page exists and is published (or allow draft in development)
    const page = result.data.page;
    if (!page) {
      notFound();
    }

    // In production, only show published pages
    if (process.env.NODE_ENV === "production" && page.status !== "published") {
      notFound();
    }

    // Use PageClient for visual editing support
    const { PageClient } = await import("@/components/PageClient");
    return (
      <PageClient
        query={query}
        variables={variables}
        data={result.data}
      />
    );
  } catch {
    notFound();
  }
}
