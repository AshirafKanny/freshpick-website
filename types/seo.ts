export interface PageSeoInput {
  title: string;
  description: string;
  /** Path only, e.g. "/menu/juices". Combined with the site URL to build canonical + OG URLs. */
  path: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}
