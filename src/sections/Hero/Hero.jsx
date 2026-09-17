import { ArrowUpRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiReact, SiNodedotjs, SiExpress, SiMongodb } from "react-icons/si";

import { useEffect, useState } from "react";

function Hero() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch(`${API_URL}/api/resume`)

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        setResumeUrl(data.url);
      } catch (error) {
        console.error("Failed to fetch resume:", error);
      }
    };

    fetchResume();
  }, []);

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

  const technologies = [
    {
      name: "React",
      icon: SiReact,
    },
    {
      name: "Node.js",
      icon: SiNodedotjs,
    },
    {
      name: "Express",
      icon: SiExpress,
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
    },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-72px)] items-start overflow-hidden pt-24 sm:items-center sm:pt-0"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          {/* Availability */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] px-3.5 py-2 text-sm text-[var(--text-secondary)]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Available for opportunities
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
            Building digital experiences
            <span className="block text-[var(--accent)]">
              that make an impact.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            I'm Adarsh, a MERN Stack Developer focused on building responsive,
            scalable and user-friendly web applications with modern
            technologies.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-[var(--accent)]/20"
            >
              View Projects
              <ArrowUpRight size={17} />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-all hover:bg-[var(--bg-surface-hover)]"
            >
              Contact Me
            </a>

            <a
              href={resumeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] border border-[var(--border)] bg-[var(--bg-surface)]"
            >
              <Download size={17} />
              Resume
            </a>
          </div>

          {/* Social links */}
          <div className="mt-8 flex items-center justify-center gap-3 sm:justify-start">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target={social.name !== "Email" ? "_blank" : undefined}
                  rel={
                    social.name !== "Email" ? "noopener noreferrer" : undefined
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon size={18} strokeWidth={1.8} />
                </a>
              );
            })}
          </div>

          {/* Core stack */}
          <div className="mt-12">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Core Stack
            </p>

            <div className="flex flex-wrap gap-2.5">
              {technologies.map((technology) => {
                const Icon = technology.icon;

                return (
                  <div
                    key={technology.name}
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] px-3.5 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                  >
                    <Icon size={17} />
                    {technology.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
