import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import SectionHeading from "../SectionHeading";

/*
 * Web3Forms access keys are public by design, so this ships in the bundle
 * and works on every deploy without extra config. Set VITE_WEB3FORMS_KEY
 * to override it (e.g. to rotate the key without a code change).
 */
const WEB3FORMS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY || "c291a315-54ed-4e8a-b725-fc0534b7f9a4";

const WHATSAPP_NUMBER = "917821836954";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | sending | sent | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Carry whatever they have already typed into the WhatsApp draft.
  const whatsappHref = () => {
    const name = formData.name.trim();
    const message = formData.message.trim();
    const greeting = name ? `Hi Dinesh, this is ${name}.` : "Hi Dinesh,";
    const body = message || "I saw your portfolio and wanted to get in touch.";
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${greeting} ${body}`)}`;
  };

  const sendMail = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Sent as FormData on purpose: a JSON content-type triggers a CORS
      // preflight that this endpoint rejects, so the request never leaves
      // the browser. Multipart is safelisted and goes straight through.
      // The empty honeypot rides along from the form element itself.
      const body = new FormData(e.target);
      body.append("access_key", WEB3FORMS_KEY);
      body.append("subject", `Portfolio message from ${formData.name || "a visitor"}`);
      body.append("from_name", "Portfolio contact form");
      body.append("replyto", formData.email);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Send failed");
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full bg-ink border border-seam text-bone px-3 py-2 rounded-sm placeholder:text-ash/60 focus:border-copper focus:outline-none transition-colors";
  const labelClasses =
    "block font-mono text-xs tracking-widest uppercase text-ash mb-1.5";

  return (
    <section className="py-16 px-6 md:px-16 flex min-h-screen justify-center items-center">
      <div className="w-full max-w-md mt-14">
        <SectionHeading
          label="Contact"
          title="Get in touch"
          sub="Hiring, collaborating, or want something built? Tell me what you're working on."
        />
        <form onSubmit={sendMail} className="bg-panel border border-seam p-6 rounded-md">
          {/* honeypot — hidden from people, tempting to bots */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
          />

          <div className="mb-4">
            <label htmlFor="name" className={labelClasses}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className={labelClasses}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className={labelClasses}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={inputClasses}
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-copper hover:bg-copper-bright disabled:opacity-60 text-ink py-2.5 px-4 rounded-sm font-semibold transition-colors"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          <div className="flex items-center gap-3 my-4" aria-hidden="true">
            <span className="h-px flex-1 bg-seam" />
            <span className="font-mono text-[11px] text-ash uppercase tracking-widest">or</span>
            <span className="h-px flex-1 bg-seam" />
          </div>

          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 border border-seam hover:border-trace text-bone hover:text-trace py-2.5 px-4 rounded-sm font-semibold transition-colors"
          >
            <FaWhatsapp className="text-lg text-trace" />
            Message me on WhatsApp
          </a>
          <p className="font-mono text-[11px] text-ash mt-2 text-center">
            Opens WhatsApp with whatever you have typed above.
          </p>

          {status === "sent" && (
            <p className="font-mono text-sm text-trace mt-4">
              Message sent — I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="font-mono text-sm text-copper mt-4">
              That didn&apos;t go through. Try WhatsApp above, or email dineshdc7821@gmail.com.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
