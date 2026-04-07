import type { ActiveCollectionKey } from "../active-collection";
import type { ParsedLocation } from "./location";
import { normalizePhoneE164, siteConfig } from "../site-config";

export type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_BY_COLLECTION: Record<ActiveCollectionKey, FaqItem[]> = {
  roofing: [
    {
      question: "Do you offer emergency roofing repairs?",
      answer:
        "Yes. We coordinate local emergency roofing response for leak mitigation and urgent storm-damage inspections.",
    },
    {
      question: "How quickly can a roofer arrive?",
      answer:
        "Most service areas support same-day dispatch windows depending on technician availability and weather conditions.",
    },
    {
      question: "Can you inspect roof leaks before full replacement?",
      answer:
        "Yes. We prioritize inspection-first recommendations so homeowners can compare repair vs replacement options.",
    },
    {
      question: "Do you handle storm and wind roof damage?",
      answer:
        "Yes. We help with common storm damage scenarios including missing shingles, flashing issues, and active leaks.",
    },
    {
      question: "Are estimates available for local roofing service?",
      answer:
        "Yes. Availability varies by city, but transparent estimate options are provided before work is scheduled.",
    },
  ],
  plumbing: [
    {
      question: "Do you provide emergency plumber service?",
      answer:
        "Yes. Emergency plumbing support is available for urgent leak, backup, and water flow issues.",
    },
    {
      question: "Can you help with leaky pipe and clogged drain problems?",
      answer:
        "Yes. Local technicians handle pipe leaks, drain clogs, and standard residential plumbing repairs.",
    },
    {
      question: "Are same-day plumbing appointments available?",
      answer:
        "In many cities, same-day scheduling is available based on demand and technician coverage.",
    },
    {
      question: "Do you service both kitchen and bathroom plumbing?",
      answer:
        "Yes. Typical service includes sinks, toilets, faucets, supply lines, and drain line troubleshooting.",
    },
    {
      question: "Will I get pricing details before work starts?",
      answer:
        "Yes. Service teams provide scope and pricing details before work begins whenever possible.",
    },
  ],
  pestcontrol: [
    {
      question: "Do you provide fast pest control service?",
      answer:
        "Yes. Local service teams support rapid scheduling for urgent pest concerns in most coverage areas.",
    },
    {
      question: "Can you treat ants, roaches, and rodents?",
      answer:
        "Yes. Common treatment requests include ants, cockroaches, and rodent activity in residential properties.",
    },
    {
      question: "Are recurring pest treatment plans available?",
      answer:
        "Yes. Many areas offer recurring treatment plans to reduce reinfestation risks over time.",
    },
    {
      question: "Is inspection included before treatment?",
      answer:
        "Yes. A basic inspection is typically performed first to identify hotspots and treatment scope.",
    },
    {
      question: "Do you provide prevention recommendations?",
      answer:
        "Yes. Technicians usually provide practical prevention steps for sanitation, entry points, and moisture control.",
    },
  ],
};

export function getFaqByCollection(collection: ActiveCollectionKey): FaqItem[] {
  return FAQ_BY_COLLECTION[collection];
}

export function buildLocalBusinessSchema(params: {
  collection: ActiveCollectionKey;
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  location?: ParsedLocation | null;
}) {
  const { collection, pageTitle, pageDescription, pageUrl, location } = params;
  const serviceType = siteConfig.nicheLabel;
  const telephone = normalizePhoneE164(siteConfig.phoneE164);

  const areaServed = location
    ? {
        "@type": "Place",
        name: `${location.city}, ${location.state}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: location.city,
          addressRegion: location.state,
          postalCode: location.zip,
          addressCountry: "US",
        },
      }
    : {
        "@type": "Country",
        name: "US",
      };

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${serviceType} Service`,
    description: pageDescription,
    url: pageUrl,
    telephone,
    areaServed,
    serviceType,
    slogan: pageTitle,
    knowsAbout: [collection, serviceType, "Emergency service"],
  };
}

export function buildFaqSchema(faqItems: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

