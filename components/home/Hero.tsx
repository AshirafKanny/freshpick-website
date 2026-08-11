import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { OrderButton } from "@/components/ui/OrderButton";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config/site";

export function Hero() {
  return (
    <section className="overflow-hidden border-b border-border">
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Fresh Juices &amp; Food · {siteConfig.city}
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Fresh Flavours.
            <br />
            Made for You.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Fresh fruit juices, refreshing blends and satisfying favourites — from shawarma to
            chips — prepared for every craving.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/menu" size="lg">
              Explore Menu
            </LinkButton>
            <OrderButton variant="outline" size="lg" />
          </div>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
          <div className="absolute inset-0 rounded-[2.5rem] bg-primary-light" />
          <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-secondary-light sm:h-36 sm:w-36" />
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.name} logo`}
            width={280}
            height={251}
            priority
            className="relative"
          />
        </div>
      </Container>
    </section>
  );
}
