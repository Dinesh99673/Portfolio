import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import SectionHeading from "../SectionHeading";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const SendMail = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm('service_vnbn1ae', 'template_9gx484v', e.target, 'iiYITmOXLsHkUi_m6')
      .then(() => {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => setStatus("error"));
  };

  const inputClasses =
    "w-full bg-ink border border-seam text-bone px-3 py-2 rounded-sm placeholder:text-ash/60 focus:border-copper focus:outline-none transition-colors";

  return (
    <section className="py-16 px-6 md:px-16 flex min-h-screen justify-center items-center">
      <div className="w-full max-w-md mt-14">
        <SectionHeading label="Contact" title="Get in touch" />
        <form onSubmit={SendMail} className="bg-panel border border-seam p-6 rounded-md">
          <div className="mb-4">
            <label htmlFor="name" className="block font-mono text-xs tracking-widest uppercase text-ash mb-1.5">
              Name
            </label>
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
            <label htmlFor="email" className="block font-mono text-xs tracking-widest uppercase text-ash mb-1.5">
              Email
            </label>
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
            <label htmlFor="message" className="block font-mono text-xs tracking-widest uppercase text-ash mb-1.5">
              Message
            </label>
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
          {status === "sent" && (
            <p className="font-mono text-sm text-trace mt-4">Message sent — I&apos;ll get back to you soon.</p>
          )}
          {status === "error" && (
            <p className="font-mono text-sm text-copper mt-4">Something went wrong. Please try again, or email me directly.</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
