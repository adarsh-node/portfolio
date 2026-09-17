import { Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

function Footer() {
  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/adarsh-node",
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/adarsh-techie/",
      icon: FaLinkedinIn,
    },
    {
      name: "Email",
      href:"mailto:it.adarsh03@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-surface)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="inline-block text-xl font-bold tracking-[-0.04em] text-[var(--text-primary)]"
            >
              ADARSH<span className="text-[var(--accent)]">.</span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
              MERN Stack Developer focused on building modern, responsive and
              user-friendly web applications.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Quick Links
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex cursor-pointer items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                >
                  <span className="text-[var(--accent)] opacity-60 transition-opacity group-hover:opacity-100">
                    ›
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Contact
            </h3>

            <div className="mt-5 space-y-4">
              <a
                href="mailto:it.adarsh03@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center gap-3 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
              >
                <Mail size={17} className="shrink-0 text-[var(--accent)]" />
                <span>it.adarsh03@gmail.com</span>
              </a>

              <a
                href="tel:+916394375321"
                className="flex cursor-pointer items-center gap-3 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
              >
                <Phone size={17} className="shrink-0 text-[var(--accent)]" />
                <span>+91 6394375321</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <MapPin size={17} className="shrink-0 text-[var(--accent)]" />
                <span>Bangalore, India</span>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Open to new opportunities
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026{" "}
            <span className="font-medium text-[var(--accent)]">Adarsh</span> ·
            All rights reserved.
          </p>

          <p>
            Built with{" "}
            <span className="font-medium text-[var(--text-secondary)]">
              <span className="font-medium text-[var(--accent)]">MERN</span> Stack
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
