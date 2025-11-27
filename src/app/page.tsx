import client from "../../tina/__generated__/client";
import { LandingPageClient } from "@/components/LandingPageClient";

const query = `query landing($relativePath: String!) {
  landing(relativePath: $relativePath) {
    ... on Document {
      _sys { filename basename breadcrumbs path relativePath extension }
      id
    }
    __typename
    seo { __typename metaTitle metaDescription ogImage ogType canonicalUrl noIndex }
    navbar { __typename logo ctaText ctaLink }
    sections {
      __typename
      ... on LandingSectionsHero {
        badge
        headline
        benefits { __typename text }
        ctaText
        ctaLink
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
    }
    footer { __typename socialLinks { __typename platform url } logo copyright certifications { __typename logo label } legalLinks { __typename text url } resourceLinks { __typename text url } founders { __typename name } contact { __typename phone email hours } companyLinks { __typename text url } }
  }
}`;

const variables = { relativePath: "home.json" };

export default async function Home() {
  const result = await client.queries.landing(variables);

  return (
    <LandingPageClient
      query={query}
      variables={variables}
      data={result.data}
    />
  );
}
