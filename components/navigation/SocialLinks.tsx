import { siteConfig } from "@/lib/config/site";
import { cn, isPlaceholder } from "@/lib/utils";

const SOCIAL_LABELS: Record<keyof typeof siteConfig.socialLinks, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter",
  tiktok: "TikTok",
  youtube: "YouTube",
};

export function SocialLinks({ className }: { className?: string }) {
  const links = (Object.keys(SOCIAL_LABELS) as Array<keyof typeof siteConfig.socialLinks>)
    .map((key) => ({ key, url: siteConfig.socialLinks[key], label: SOCIAL_LABELS[key] }))
    .filter((link) => !isPlaceholder(link.url));

  if (links.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-4 text-sm font-medium", className)}>
      {links.map((link) => (
        <a
          key={link.key}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
