import client from "../../tina/__generated__/client";

const query = `query landing($relativePath: String!) {
  landing(relativePath: $relativePath) {
    ... on Document {
      _sys { filename basename breadcrumbs path relativePath extension }
      id
    }
    __typename
    seo { __typename metaTitle metaDescription ogImage ogType canonicalUrl noIndex }
    navbar { __typename variant logo ctaText ctaLink loginLink }
    sections {
      __typename
      ... on LandingSectionsHero {
        badge
        headline
        benefits { __typename text }
        ctaText
        ctaLink
        priceText
        backgroundImage
      }
      ... on LandingSectionsCertifications {
        title
        badges { __typename logo label }
      }
      ... on LandingSectionsTestimonials {
        headline
        subheadline
        videos { __typename name backgroundImage videoUrl rating productName productDescription productImage }
        ctaText
        ctaLink
        moreText
        moreLink
      }
      ... on LandingSectionsProblem {
        headline
        stat
        statDescription
        explanation
        illustration
        hairLossTypes { __typename name icon }
      }
      ... on LandingSectionsProducts {
        headline
        items { __typename name tags { __typename text } image selectText moreText link }
      }
      ... on LandingSectionsIngredients {
        headline
        items { __typename name description image }
        ctaText
        ctaLink
      }
      ... on LandingSectionsEffectiveness {
        headline
        chartTitle
        stats { __typename label percentage }
        conclusion
        sourcesTitle
        sources
        ctaText
        ctaLink
      }
      ... on LandingSectionsWhyChoose {
        headline
        valueProps { __typename title description icon }
        ctaText
        ctaLink
      }
      ... on LandingSectionsGuarantee {
        days
        headline
        description
      }
      ... on LandingSectionsHowItWorks {
        headline
        steps { __typename title description icon }
        ctaText
        ctaLink
      }
      ... on LandingSectionsFinalCta {
        headline
        subheadline
        ctaText
        ctaLink
      }
      ... on LandingSectionsSuccessStories {
        highlightText
        normalText
        ctaPrimaryText
        ctaPrimaryLink
        ctaSecondaryText
        ctaSecondaryLink
        testimonials { __typename name age quote beforeImage afterImage monthsBefore monthsAfter }
      }
      ... on LandingSectionsFormulas {
        headline
        highlightText
        formulas { __typename name image tags { __typename text variant } ctaText ctaLink }
      }
      ... on LandingSectionsActivos {
        headline
        highlightText
        ctaText
        ctaLink
        activos { __typename name description image }
      }
      ... on LandingSectionsVideoTestimonials {
        headline
        highlightText
        ctaText
        ctaLink
        videos { __typename name backgroundImage videoUrl }
      }
      ... on LandingSectionsHowItWorksNew {
        headline
        ctaText
        ctaLink
        steps { __typename title description image }
      }
      ... on LandingSectionsFinalCtaNew {
        headline
        ctaText
        ctaLink
        backgroundImage
      }
      ... on LandingSectionsFaq {
        headline
        highlightText
        items { __typename question answer }
      }
      ... on LandingSectionsFooterNew {
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
    }
    footer { __typename socialLinks { __typename platform url } logo copyright certifications { __typename logo label } legalLinks { __typename text url } resourceLinks { __typename text url } founders { __typename name } contact { __typename phone email hours } companyLinks { __typename text url } }
  }
}`;

const variables = { relativePath: "home.json" };

export default async function Home() {
  const result = await client.queries.landing(variables);

  // Always use LandingPageClient which includes useTina hook for visual editing
  // TinaCMS handles detection of edit mode internally via iframe communication
  const { LandingPageClient } = await import("@/components/LandingPageClient");
  return (
    <LandingPageClient
      query={query}
      variables={variables}
      data={result.data}
    />
  );
}
