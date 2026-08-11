export interface PageSeoInput {
  title: string;
  description: string;
  /** Path only, e.g. "/menu/juices". Combined with the site URL to build canonical + OG URLs. */
  path: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  /**
   * When true, `title` is used as-is in <title> instead of being run through the
   * root layout's "%s | FreshPick" template. Use only when `title` is already a
   * complete, standalone title (e.g. the homepage) — every other page should
   * pass a short page name and let the template add the site name.
   */
  absoluteTitle?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}
