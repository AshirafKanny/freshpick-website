export interface OpeningHoursRange {
  /** Schema.org day names, e.g. "Monday" */
  days: string[];
  opens: string;
  closes: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  city: string;
  country: string;
  geo?: GeoCoordinates;
  openingHours: OpeningHoursRange[];
  socialLinks: SocialLinks;
  logo: string;
}
