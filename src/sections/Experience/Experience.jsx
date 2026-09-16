import { BriefcaseBusiness, CalendarDays } from "lucide-react";

function Experience() {
  return (
    <section id="experience" className="border-t border-[var(--border)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            Experience
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
            Professional <span className="text-[var(--accent)]">journey.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
            Practical experience solving technical problems and working with
            real-world telecom systems.
          </p>
        </div>

        {/* Experience */}
        <div className="mt-5">
          <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[var(--accent)]">
                  <BriefcaseBusiness size={18} strokeWidth={1.8} />

                  <span className="text-sm font-medium">
                    Professional Experience
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                  TSG Engineer
                </h3>

                <p className="mt-1 text-sm font-medium text-[var(--text-secondary)] sm:text-base">
                  Vedang Cellular Services
                </p>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <CalendarDays size={16} strokeWidth={1.8} />
                <span>Sep 2025 — Mar 2026</span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-[var(--border)]" />

            {/* Responsibilities */}
            <ul className="space-y-3 text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>
                  Troubleshot telecom network and connectivity issues to
                  identify and resolve technical problems.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>
                  Performed network testing and analyzed performance-related
                  issues.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>
                  Used G-NetTrack Pro to collect network measurements and
                  analyze mobile network performance.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>
                  Coordinated with technical teams to investigate and resolve
                  reported network issues.
                </span>
              </li>
            </ul>

            {/* Skills / Tools */}
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                G-NetTrack Pro
              </span>

              <span className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                Network Troubleshooting
              </span>

              <span className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                Network Testing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;