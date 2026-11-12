"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import type { ContactFormErrors, ContactFormValues } from "@/types";

const EMPTY: ContactFormValues = { name: "", email: "", service: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: ContactFormValues): ContactFormErrors {
  const e: ContactFormErrors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email.";
  if (!v.service) e.service = "Please select a service.";
  return e;
}

/* turns the form values into a readable WhatsApp message */
function buildWhatsappMessage({ name, email, service, message }: ContactFormValues) {
  const lines = [
    `Hi SOZOQ, 
I'm ${name.trim()} and I'm interested in ${service}.`,
  ];
  if (message.trim()) {
    lines.push(`About my project: ${message.trim()}`);
  }
  lines.push(
    `You can reach me at ${email.trim()}. Looking forward to hearing from you!`,
  );
  return lines.join("\n");
}

/* underlined field; the label doubles as the placeholder (so the name field can
   read "Your Name" on desktop and "First name" on mobile, as in the designs) */
function Field({
  id,
  label,
  labelMobile,
  value,
  error,
  children,
}: {
  id: string;
  label: string;
  labelMobile?: string;
  value: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`ct-field${value ? " has-value" : ""}${error ? " has-error" : ""}`}
    >
      {children}
      <label className="ct-field__label" htmlFor={id}>
        <span className={labelMobile ? "ct-only-desktop" : undefined}>
          {label}
        </span>
        {labelMobile ? (
          <span className="ct-only-mobile">{labelMobile}</span>
        ) : null}
      </label>
      {error ? (
        <p className="ct-field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface ContactFormProps {
  services: string[];
  thanks: string;
  thanksButton: string;
  thanksImage: string;
  whatsappUrl: string;
}

export default function ContactForm({
  services,
  thanks,
  thanksButton,
  thanksImage,
  whatsappUrl,
}: ContactFormProps) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [waNotice, setWaNotice] = useState("");

  const set = (key: keyof ContactFormValues) => (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = ev.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (waNotice) setWaNotice("");
  };

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (status === "sending") return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function sendViaWhatsapp() {
    const found = validate(values); // name, valid email, service are required
    setErrors(found);

    if (Object.keys(found).length) {
      const empty =
        !values.name.trim() && !values.email.trim() && !values.service;
      setWaNotice(
        empty
          ? "Please enter your details in the form to send via WhatsApp."
          : "Please fill in the highlighted details to send via WhatsApp.",
      );
      return;
    }

    setWaNotice("");
    const url = `${whatsappUrl}?text=${encodeURIComponent(buildWhatsappMessage(values))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setWaNotice("");
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="ct-form ct-form--done" role="status">
        <div className="ct-done">
          <img
            className="ct-done__img"
            src={thanksImage}
            alt=""
            width={282}
            height={188}
          />
          <p className="ct-done__text">{thanks}</p>
        </div>
        <div className="ct-form__actions">
          <button type="button" className="ct-btn ct-btn--dark" onClick={reset}>
            {thanksButton}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="ct-form" onSubmit={onSubmit} noValidate>
      <div className="ct-form__fields">
        <Field
          id="ct-name"
          label="Your Name"
          labelMobile="First name"
          value={values.name}
          error={errors.name}
        >
          <input
            id="ct-name"
            className="ct-field__control"
            type="text"
            name="name"
            autoComplete="given-name"
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "ct-name-error" : undefined}
          />
        </Field>

        <Field
          id="ct-email"
          label="Email ID"
          value={values.email}
          error={errors.email}
        >
          <input
            id="ct-email"
            className="ct-field__control"
            type="email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "ct-email-error" : undefined}
          />
        </Field>

        <Field
          id="ct-service"
          label="Select a service"
          value={values.service}
          error={errors.service}
        >
          <select
            id="ct-service"
            className="ct-field__control ct-field__control--select"
            name="service"
            value={values.service}
            onChange={set("service")}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "ct-service-error" : undefined}
          >
            <option value="" />
            {services.map((s) => (
              <option value={s} key={s}>
                {s}
              </option>
            ))}
          </select>
          <svg
            className="ct-field__chevron"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m4 6 4 4 4-4"
              stroke="#7b7b7b"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Field>

        <Field
          id="ct-message"
          label="Tell us more about your project"
          value={values.message}
        >
          <textarea
            id="ct-message"
            className="ct-field__control ct-field__control--area"
            name="message"
            rows={1}
            value={values.message}
            onChange={set("message")}
          />
        </Field>
      </div>

      {waNotice ? (
        <p className="ct-form__error" role="alert">
          {waNotice}
        </p>
      ) : null}

      {status === "error" ? (
        <p className="ct-form__error" role="alert">
          Something went wrong. Please try again, or message us on WhatsApp.
        </p>
      ) : null}

      <div className="ct-form__actions">
        <button
          type="button"
          className="ct-btn ct-btn--light"
          onClick={sendViaWhatsapp}
          aria-label="Send via Whatsapp"
        >
          Send via
          <span className="ct-only-desktop"> Whatsapp</span>
          <svg
            className="ct-wa-icon ct-only-mobile"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
              fill="#25D366"
            />
          </svg>
        </button>
        <button
          type="submit"
          className="ct-btn ct-btn--dark"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Submit"}
        </button>
      </div>
    </form>
  );
}
