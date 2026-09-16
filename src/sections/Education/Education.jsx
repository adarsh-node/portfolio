import { CalendarDays, GraduationCap } from "lucide-react";

const education = [
  {
    degree: "B.Tech — Information Technology",
    institution: "Buddha Institute of Technology, Gorakhpur",
    university: "(AKTU)",
    year: "2021 — 2025",
    result: "CGPA: 7.56 / 10",
  },
  {
    degree: "Class XII",
    institution: "Saraswati Vidya Mandir Inter College",
    university: "Mathura Nagar, Maharajganj",
    year: "2021",
    result: null,
  },
  {
    degree: "Class X",
    institution: "Abhinav Vidyalaya",
    university: "Campiarganj, Gorakhpur",
    year: "2019",
    result: null,
  },
];

function Education() {
  return (
    <section id="education" className="border-t border-[var(--border)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">

        {/* Section Heading */}
        <div>
  <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
    Education
  </p>

  <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
    Academic <span className="text-[var(--accent)]">background.</span>
  </h2>

  <p className="mt-4 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
    My educational journey and academic foundation.
  </p>
</div>

        {/* Education Cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {education.map((item) => (
            <article
              key={item.degree}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)] sm:p-6"
            >
              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]">
                <GraduationCap size={21} strokeWidth={1.8} />
              </div>

              {/* Degree */}
              <h4 className="mt-5 text-lg font-bold leading-snug text-[var(--text-primary)]">
                {item.degree}
              </h4>

              {/* Status */}
              <span className="mt-3 inline-flex rounded-full border border-[var(--border)] bg-[var(--bg-primary)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
                Completed
              </span>

              {/* Institution */}
              <p className="mt-4 text-sm font-medium leading-6 text-[var(--text-secondary)]">
                {item.institution}
              </p>

              <p className="text-sm leading-6 text-[var(--text-muted)]">
                {item.university}
              </p>

              {/* Year + Result */}
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--border)] pt-4 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} strokeWidth={1.8} />
                  {item.year}
                </span>

                {item.result && (
                  <span className="font-semibold text-[var(--accent)]">
                    {item.result}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;