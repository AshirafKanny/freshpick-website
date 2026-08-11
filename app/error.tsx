"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section as="div">
      <Container className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="mt-2 text-muted">
          Please try again, or come back a little later.
        </p>
        <div className="mt-6">
          <Button onClick={reset}>Try again</Button>
        </div>
      </Container>
    </Section>
  );
}
