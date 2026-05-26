import site from "./site.json";

export interface SiteContent {
  hero: {
    name: string;
    tagline: string;
    roles: string[];
    cvUrl: string;
  };
  about: {
    intro: string;
    journey: string[];
    skills: string[];
  };
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  social: {
    github: string;
    linkedin: string;
  };
}

export const siteContent = site as SiteContent;
export const CONTENT_PATH = "src/content/site.json";
