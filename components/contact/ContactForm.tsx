"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config/site";
import { isPlaceholder } from "@/lib/utils";

interface FormState {
  name: string;
  contact: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: "", contact: "", message: "" };

/**
 * No backend exists yet, so this honestly opens a pre-filled email draft
 * (via mailto:) instead of pretending to submit to a server. Swap the
 * onSubmit handler for a real API call once one exists — the validation
 * and field shape won't need to change.
 */
export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const emailConfigured = !isPlaceholder(siteConfig.email);

  function validate(): boolean {
    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.contact.trim()) nextErrors.contact = "Please enter an email or phone number.";
    if (!form.message.trim()) nextErrors.message = "Please enter a message.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate() || !emailConfigured) return;

    const subject = `Website enquiry from ${form.name}`;
    const body = `${form.message}\n\nReach me at: ${form.contact}`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-secondary">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact" className="text-sm font-medium">
          Email or phone
        </label>
        <input
          id="contact"
          type="text"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={errors.contact ? "contact-error" : undefined}
        />
        {errors.contact && (
          <p id="contact-error" className="mt-1 text-xs text-secondary">
            {errors.contact}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-secondary">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={!emailConfigured}>
        Send Message
      </Button>

      {!emailConfigured && (
        <p className="text-sm text-muted">
          The contact form isn&apos;t connected yet — please reach us via the phone or WhatsApp
          details above in the meantime.
        </p>
      )}
    </form>
  );
}
