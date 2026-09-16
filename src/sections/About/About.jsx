import { Code2, Lightbulb, TrendingUp } from "lucide-react";
import profileImage from "../../assets/profile.png";

function About() {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Write maintainable and scalable code",
    },
    {
      icon: Lightbulb,
      title: "Problem Solving",
      description: "Turn ideas into real solutions",
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description: "Always learning, always improving",
    },
  ];

  return (
    <section id="about" className="border-t border-[var(--border)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-16">
          {/* LEFT SIDE */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
              About Me
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
              Building with{" "}
              <span className="text-[var(--accent)]">purpose.</span>
            </h2>

            {/* Profile Image */}
            <div className="mt-5 w-full max-w-[380px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]">
              <img
                src={profileImage}
                alt="Adarsh - MERN Stack Developer"
                className="block h-auto w-full"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="pt-1">
            <div className="space-y-5 text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
              <p>
                I'm Adarsh, a{" "}
                <span className="font-semibold text-[var(--accent)]">
                  MERN Stack Developer
                </span>{" "}
                focused on building modern, responsive and user-friendly web
                applications.
              </p>

              <p>
                I enjoy turning ideas into practical products using React,
                Node.js, Express.js and MongoDB, with a strong focus on clean
                code, performance and real-world usability.
              </p>

              <p>
                I'm currently looking for opportunities where I can contribute,
                keep improving my skills and grow as a professional full-stack
                developer.
              </p>
            </div>

            {/* Divider */}
            <div className="my-7 h-px w-full bg-[var(--border)]" />

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="group text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--bg-surface-hover)]">
                      <Icon size={21} strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-3 text-xs font-semibold text-[var(--text-primary)] sm:text-sm">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-[10px] leading-4 text-[var(--text-muted)] sm:text-xs sm:leading-5">
                      {item.description}
                    </p>
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

export default About;
