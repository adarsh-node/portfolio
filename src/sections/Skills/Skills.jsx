import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiGit,
  SiVite,
} from "@icons-pack/react-simple-icons";

import { SiGithub, SiJsonwebtokens, SiExpress } from "react-icons/si";

import { VscCode } from "react-icons/vsc";
import { AiOutlineApi } from "react-icons/ai";

function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML5", icon: SiHtml5 },
        { name: "CSS3", icon: SiCss },
        { name: "JavaScript", icon: SiJavascript },
        { name: "React", icon: SiReact },
        { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "Redux", icon: SiRedux },
        { name: "JavaScript", icon: SiTypescript },
      ],
    },

    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Express.js", icon: SiExpress, darkModeColor: "#ffffff" },
        { name: "REST APIs", icon: AiOutlineApi },
        { name: "JWT", icon: SiJsonwebtokens, darkModeColor: "#ffffff" },
      ],
    },

    {
      title: "Database",
      skills: [
        { name: "MongoDB", icon: SiMongodb },
        { name: "Mongoose", icon: SiMongoose },
        { name: "MySQL", icon: SiMysql },
      ],
    },

    {
      title: "Tools & Workflow",
      skills: [
        { name: "Git", icon: SiGit },
        { name: "GitHub", icon: SiGithub },
        { name: "VS Code", icon: VscCode },
        { name: "Vite", icon: SiVite },
      ],
    },
  ];

  return (
    <section id="skills" className="border-t border-[var(--border)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        {/* Section heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            Skills
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
            Technologies I work with.
          </h2>

          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
            A practical toolkit for building modern, responsive and full-stack
            web applications.
          </p>
        </div>

        {/* Skill categories */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 transition-colors hover:bg-[var(--bg-surface-hover)] sm:p-6"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)]">
                {category.title}
              </h3>

              <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;

                  return (
                    <div
                      key={skill.name}
                      className="group  rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-3 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)] hover:bg-[var(--bg-surface-hover)]"
                    >
                      <div className="flex  flex-col items-center justify-center">
                        <Icon
                          size={36}
                          color="default"
                          title={skill.name}
                          className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                        />

                        <span className="mt-3 text-center text-xs font-medium leading-4 text-[var(--text-primary)]">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
