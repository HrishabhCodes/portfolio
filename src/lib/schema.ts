import { profile, bio, socials, faq } from "../data/profile";
import { experience } from "../data/experience";
import { education, certifications } from "../data/education";
import { allSkills } from "../data/stack";
import type { Post } from "./writing";

const SITE = profile.url;
const PERSON_ID = `${SITE}/#person`;

/** One @graph: WebSite + ProfilePage(Person) + FAQPage, all derived from data/. */
export function buildJsonLd(imageUrl: string, now = new Date()) {
  const current = experience.find((r) => !r.end)!;

  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    givenName: profile.givenName,
    familyName: profile.familyName,
    alternateName: profile.handle,
    jobTitle: profile.jobTitle,
    description: bio,
    url: SITE,
    image: imageUrl,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressRegion: profile.location.region,
      addressCountry: profile.location.countryCode,
    },
    worksFor: {
      "@type": "Organization",
      name: current.company,
      ...(current.companyUrl && { url: current.companyUrl }),
    },
    hasOccupation: experience.map((r) => ({
      "@type": "Role",
      roleName: r.title,
      startDate: r.start,
      ...(r.end && { endDate: r.end }),
      description: r.summary,
      worksFor: { "@type": "Organization", name: r.company, ...(r.companyUrl && { url: r.companyUrl }) },
    })),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.school,
      address: education.city,
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: education.degree,
        recognizedBy: { "@type": "CollegeOrUniversity", name: education.school },
      },
      ...certifications.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: c.name,
        ...(c.issuer && { recognizedBy: { "@type": "Organization", name: c.issuer } }),
      })),
    ],
    knowsAbout: allSkills,
    sameAs: socials.map((s) => s.href),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: profile.name,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE}/#profile`,
        url: SITE,
        name: `${profile.name} · ${profile.jobTitle}`,
        dateModified: now.toISOString(),
        isPartOf: { "@id": `${SITE}/#website` },
        mainEntity: person,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/#faq`,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** schema.org nodes for the /writing feed: a CollectionPage listing every post. */
export function buildWritingJsonLd(posts: Post[], pageUrl: string) {
  return [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#page`,
      url: pageUrl,
      name: `Writing · ${profile.name}`,
      isPartOf: { "@id": `${SITE}/#website` },
      author: { "@id": PERSON_ID },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": p.platform === "medium" ? "BlogPosting" : "SocialMediaPosting",
            url: p.url,
            ...(p.title && { headline: p.title }),
            ...(p.platform !== "medium" && { articleBody: p.text }),
            ...(p.platform === "medium" && { abstract: p.text }),
            datePublished: p.date,
            author: { "@id": PERSON_ID },
            ...(p.image && { image: p.image }),
          },
        })),
      },
    },
  ];
}
