import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .trim()
    .slice(0, max);
const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ESCAPES[c]);

/* saves the enquiry to Google Sheets through a private Apps Script.
   Both values are server-only env vars – never sent to the browser. */
async function saveToSheet(data: {
  name: string;
  email: string;
  service: string;
  message: string;
}) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_SECRET;
  if (!url || !secret) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, ...data }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    const json = await res.json().catch(() => null);
    return res.ok && json?.ok === true;
  } catch {
    return false;
  }
}

/* POST /api/contact
   1. Saves the enquiry to a Google Sheet when these environment variables are set:
        SHEETS_WEBHOOK_URL – the Apps Script web app URL (ends with /exec)
        SHEETS_SECRET      – the secret stored in the script's SECRET property
   2. Sends the enquiry by email through Resend (https://resend.com) when these
      environment variables are set:
        RESEND_API_KEY   – your Resend API key
        CONTACT_TO_EMAIL – inbox that receives enquiries, e.g. hello@sozoq.in
        CONTACT_FROM_EMAIL (optional) – verified sender, default "Sozoq <onboarding@resend.dev>"
   A lead is only treated as lost if BOTH the sheet and the email fail.
   Without any configuration it only logs the enquiry in development and returns
   an error in production, so a lead is never silently lost. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const service = clean(body.service, 80);
  const message = clean(body.message, 4000);

  if (!name || !EMAIL_RE.test(email) || !service) {
    return NextResponse.json(
      { error: "Missing or invalid fields" },
      { status: 400 },
    );
  }

  const savedToSheet = await saveToSheet({ name, email, service, message });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!key || !to) {
    if (savedToSheet) return NextResponse.json({ ok: true });
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "[contact] (not saved – set SHEETS_WEBHOOK_URL / SHEETS_SECRET)",
        { name, email, service, message },
      );
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Sozoq <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New enquiry – ${service} – ${name}`,
      html: `<p><b>Name:</b> ${esc(name)}</p><p><b>Email:</b> ${esc(email)}</p><p><b>Service:</b> ${esc(service)}</p><p><b>Project:</b><br>${esc(message).replace(/\n/g, "<br>") || "—"}</p>`,
    }),
  });

  // a lead is only "lost" if BOTH the sheet and the email failed
  if (!res.ok && !savedToSheet) {
    return NextResponse.json({ error: "Could not send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
