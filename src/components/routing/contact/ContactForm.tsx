"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import type { ContactFormErrors, ContactFormValues } from "@/types";

const EMPTY: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s\-()]{7,18}$/;

/* which fields live on which step (used to jump to the step with an error) */
const STEP_FIELDS: (keyof ContactFormValues)[][] = [
  ["name", "phone", "email"],
  ["service"],
  ["message"],
];
const LAST_STEP = STEP_FIELDS.length - 1;

/* Figma: "Question 1 / 2 / 3" headings */
const TITLES: ReactNode[] = [
  <>
    Every Great Idea Starts
    <br />
    With You.
  </>,
  "What are you looking to build?",
  "Let’s Talk About Your Vision",
];

function validate(v: ContactFormValues): ContactFormErrors {
  const e: ContactFormErrors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  const phone = v.phone.trim();
  if (!PHONE_RE.test(phone) || phone.replace(/\D/g, "").length < 7) {
    e.phone = "Please enter a valid mobile number.";
  }
  // email is optional, but must be valid when it is filled in
  if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) {
    e.email = "Please enter a valid email.";
  }
  if (!v.service) e.service = "Please select a service.";
  return e;
}

/* first step that contains an error */
function firstStepWithError(errors: ContactFormErrors) {
  const i = STEP_FIELDS.findIndex((keys) => keys.some((k) => errors[k]));
  return i === -1 ? 0 : i;
}

/* turns the form values into a readable WhatsApp message */
function buildWhatsappMessage({
  name,
  phone,
  email,
  service,
  message,
}: ContactFormValues) {
  const lines = [
    `Hi SOZOQ,
I'm ${name.trim()} and I'm interested in ${service}.`,
  ];
  if (message.trim()) {
    lines.push(`About my project: ${message.trim()}`);
  }
  lines.push(
    email.trim()
      ? `You can reach me on ${phone.trim()} or at ${email.trim()}. Looking forward to hearing from you!`
      : `You can reach me on ${phone.trim()}. Looking forward to hearing from you!`,
  );
  return lines.join("\n");
}

/* label above, underline below (Figma "Full Name" / "Mobile Number" / "Email ID") */
function Field({
  id,
  label,
  optional,
  error,
  area,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  area?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`cf-field${error ? " has-error" : ""}`}>
      <label className="cf-field__label" htmlFor={id}>
        {label}
        {optional ? <span className="cf-field__opt"> (Optional)</span> : null}
      </label>
      <div className={`cf-field__line${area ? " cf-field__line--area" : ""}`}>
        {children}
      </div>
      {error ? (
        <p className="cf-field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const WhatsappGlyph = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      fill="#fff"
    />
  </svg>
);

const ArrowRight = () => (
  <svg
    className="cf-key__arrow"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 8h10m-4-4 4 4-4 4"
      stroke="#191919"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface ContactFormProps {
  services: string[];
  thanks: string;
  thanksButton: string;
  thanksImage: string;
  thanksImageBlink: string;
  whatsappUrl: string;
}

export default function ContactForm({
  services,
  thanks,
  thanksButton,
  thanksImage,
  thanksImageBlink,
  whatsappUrl,
}: ContactFormProps) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [waNotice, setWaNotice] = useState("");

  /* move keyboard / screen-reader focus to the new question after Next / Back */
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const moved = useRef(false);
  useEffect(() => {
    if (moved.current) titleRefs.current[step]?.focus();
  }, [step]);

  const set =
    (key: keyof ContactFormValues) =>
    (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = ev.target.value;
      setValues((v) => ({ ...v, [key]: value }));
      if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
      if (waNotice) setWaNotice("");
    };

  function goTo(next: number) {
    moved.current = true;
    setStep(next);
  }

  /* validate only the fields of the current step, then go on */
  function next() {
    const found = validate(values);
    const own: ContactFormErrors = {};
    STEP_FIELDS[step].forEach((k) => {
      if (found[k]) own[k] = found[k];
    });
    setErrors(own);
    if (Object.keys(own).length === 0) goTo(Math.min(step + 1, LAST_STEP));
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (status === "sending") return;

    // Enter on step 1 / 2 behaves like "Next"
    if (step < LAST_STEP) {
      next();
      return;
    }

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      goTo(firstStepWithError(found));
      return;
    }

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
    const found = validate(values); // name, mobile, service are required
    setErrors(found);

    if (Object.keys(found).length) {
      const empty =
        !values.name.trim() && !values.phone.trim() && !values.service;
      setWaNotice(
        empty
          ? "Please enter your details in the form to send via WhatsApp."
          : "Please fill in the highlighted details to send via WhatsApp.",
      );
      goTo(firstStepWithError(found));
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
    moved.current = false;
    setStep(0);
  }

  /* ---------- thank-you screen ---------- */
  if (status === "success") {
    return (
      <div className="cf">
        <div className="cf__stack">
          <div className="cf__card cf__card--done" role="status">
            <div className="ct-done">
              <div className="ct-done__cat" aria-hidden="true">
                <img
                  className="ct-done__img ct-done__img--open"
                  src={thanksImage}
                  alt=""
                  width={150}
                  height={144}
                />
                <img
                  className="ct-done__img ct-done__img--blink"
                  src={thanksImageBlink}
                  alt=""
                  width={150}
                  height={144}
                />
              </div>
              <p className="ct-done__text">
                {thanks}
                <span className="ct-done__sub">for choosing us</span>
              </p>
            </div>
            <div className="cf-actions cf-actions--center">
              <button
                type="button"
                className="cf-key cf-key--dark"
                onClick={reset}
              >
                <span className="cf-key__plate cf-key__plate--face">
                  {thanksButton}
                </span>
                <span className="cf-key__grooves" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- the 3-step form ----------
     3 cards stacked like the About photos: the card of the current step is in
     front, the others sit behind it. Next / Back "shuffles" the stack. */
  const renderStep = (i: number) => {
    if (i === 0) {
      return (
        <div className="cf-fields">
          <Field id="cf-name" label="Full Name" error={errors.name}>
            <input
              id="cf-name"
              className="cf-field__control"
              type="text"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={set("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "cf-name-error" : undefined}
            />
          </Field>

          <Field id="cf-phone" label="Mobile Number" error={errors.phone}>
            <input
              id="cf-phone"
              className="cf-field__control"
              type="tel"
              inputMode="tel"
              name="phone"
              autoComplete="tel"
              value={values.phone}
              onChange={set("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "cf-phone-error" : undefined}
            />
          </Field>

          <Field id="cf-email" label="Email ID" optional error={errors.email}>
            <input
              id="cf-email"
              className="cf-field__control"
              type="email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={set("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "cf-email-error" : undefined}
            />
          </Field>
        </div>
      );
    }

    if (i === 1) {
      return (
        <div className="cf-radios-wrap">
          <div
            className="cf-radios"
            role="radiogroup"
            aria-label="What are you looking to build?"
          >
            {services.map((s) => (
              <label className="cf-radio" key={s}>
                <input
                  className="cf-radio__input"
                  type="radio"
                  name="service"
                  value={s}
                  checked={values.service === s}
                  onChange={set("service")}
                />
                <span className="cf-radio__dot" aria-hidden="true" />
                <span className="cf-radio__text">{s}</span>
              </label>
            ))}
          </div>
          {errors.service ? (
            <p className="cf-notice" role="alert">
              {errors.service}
            </p>
          ) : null}
        </div>
      );
    }

    return (
      <div className="cf-fields">
        <Field id="cf-message" label="Tell us about your project" area>
          <textarea
            id="cf-message"
            className="cf-field__control cf-field__control--area"
            name="message"
            rows={1}
            value={values.message}
            onChange={set("message")}
          />
        </Field>
      </div>
    );
  };

  const renderActions = (i: number) => {
    if (i === 2) {
      return (
        <div className="cf-actions">
          <button
            type="button"
            className="cf-key cf-key--dark"
            onClick={sendViaWhatsapp}
          >
            <span className="cf-key__plate cf-key__plate--face">
              <WhatsappGlyph />
              Send Via Whatsapp
            </span>
            <span className="cf-key__grooves" aria-hidden="true" />
          </button>
          <button
            type="submit"
            className="cf-key cf-key--light"
            disabled={status === "sending"}
          >
            <span className="cf-key__plate cf-key__plate--face">
              {status === "sending" ? "Sending…" : "Submit"}
            </span>
            <span className="cf-key__grooves" aria-hidden="true" />
          </button>
        </div>
      );
    }
    return (
      <div className={`cf-actions${i === 1 ? " cf-actions--back" : ""}`}>
        {i === 1 ? (
          <button
            type="button"
            className="cf-back"
            onClick={() => goTo(step - 1)}
          >
            Back
          </button>
        ) : null}
        <button type="button" className="cf-key cf-key--light" onClick={next}>
          <span className="cf-key__plate" aria-hidden="true" />
          <span className="cf-key__label">Next</span>
          <ArrowRight />
          <span className="cf-key__grooves" aria-hidden="true" />
        </button>
      </div>
    );
  };

  return (
    <div className="cf">
      <form className="cf__stack" onSubmit={onSubmit} noValidate>
        {STEP_FIELDS.map((_, i) => {
          // 0 = front card, 1 = right behind it, 2 = the last one (same idea as
          // the About photo stack)
          const slot = (i - step + STEP_FIELDS.length) % STEP_FIELDS.length;
          const place =
            slot === 0
              ? "cf-pol--front"
              : slot === 1
                ? "cf-pol--back"
                : "cf-pol--back2";
          const isFront = slot === 0;

          return (
            <div
              key={i}
              className={`cf-pol ${place}`}
              inert={!isFront}
              role={isFront ? "group" : undefined}
              aria-label={
                isFront
                  ? `Question ${i + 1} of ${STEP_FIELDS.length}`
                  : undefined
              }
            >
              <div className="cf-pol__rot">
                <div className="cf__card">
                  <div
                    className="cf-progress"
                    role="progressbar"
                    aria-label="Form progress"
                    aria-valuemin={1}
                    aria-valuemax={STEP_FIELDS.length}
                    aria-valuenow={i + 1}
                  >
                    {STEP_FIELDS.map((__, n) => (
                      <span key={n} className={n <= i ? "is-on" : undefined} />
                    ))}
                  </div>

                  <div className="cf-body">
                    <p className="cf-eyebrow">Question {i + 1}</p>
                    <h3
                      className="cf-title"
                      tabIndex={-1}
                      ref={(el) => {
                        titleRefs.current[i] = el;
                      }}
                    >
                      {TITLES[i]}
                    </h3>

                    <div className="cf-step">{renderStep(i)}</div>

                    {isFront && waNotice ? (
                      <p className="cf-notice" role="alert">
                        {waNotice}
                      </p>
                    ) : null}

                    {isFront && status === "error" ? (
                      <p className="cf-notice" role="alert">
                        Something went wrong. Please try again, or message us on
                        WhatsApp.
                      </p>
                    ) : null}

                    {renderActions(i)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
}
