import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Check,
} from "lucide-react";

import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

const API_URL = import.meta.env.VITE_API_URL;

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus({
      type: "",
      message: "",
    });

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus({
        type: "success",
        message: "Message sent successfully!",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to send message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="border-t border-[var(--border)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            Contact
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
            Let's build <span className="text-[var(--accent)]">something.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
            Have a project, opportunity, or just want to connect? Send me a
            message and I'll get back to you.
          </p>
        </div>

        {/* Contact Content */}
        <div className="mt-5 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          {/* Left Side */}
          <div className="space-y-4">
            {/* Email */}
            <a
              href="mailto:it.adarsh03@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]">
                <Mail size={21} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-[var(--text-muted)]">Email</p>
                <p className="mt-1 break-all text-sm font-medium text-[var(--text-primary)] sm:text-base">
                  it.adarsh03@gmail.com
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+916394375321"
              className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]">
                <Phone size={21} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-sm text-[var(--text-muted)]">Phone</p>
                <p className="mt-1 text-sm font-medium text-[var(--text-primary)] sm:text-base">
                  +91 6394375321
                </p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--accent)]">
                <MapPin size={21} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-sm text-[var(--text-muted)]">Location</p>
                <p className="mt-1 text-sm font-medium text-[var(--text-primary)] sm:text-base">
                  Bangalore, India
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <a
                href="https://github.com/adarsh-node"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-5 text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <FaGithub size={22} />
                <span className="text-sm font-medium">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/adarsh-techie/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-5 text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <FaLinkedinIn size={21} />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 sm:p-6"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="mt-5">
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
              >
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
              />
            </div>

            {/* Message */}
            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm leading-6 text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
              />
            </div>

            {/* Status */}
            {status.message && (
              <div
                className={`mt-4 flex items-center gap-2 text-sm ${
                  status.type === "success"
                    ? "text-[var(--accent)]"
                    : "text-red-400"
                }`}
              >
                {status.type === "success" && <Check size={16} />}
                <span>{status.message}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={16} strokeWidth={1.8} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;