import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const API_URL = import.meta.env.VITE_API_URL;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/projects`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch projects");
        }

        setProjects(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="border-t border-[var(--border)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
        {/* Section heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            Projects
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
            Things I've built.
          </h2>

          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
            A selection of projects I've built to solve real problems and
            strengthen my full-stack development skills.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-8 text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              Loading projects...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && projects.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-surface)] p-10 text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              No projects available yet.
            </p>
          </div>
        )}

        {/* Project grid */}
        {!loading && !error && projects.length > 0 && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project._id}
                className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)]"
              >
                {/* Project image */}
                <div className="relative aspect-video overflow-hidden border-b border-[var(--border)] bg-[var(--bg-primary)]">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} project preview`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-sm text-[var(--text-muted)]">
                        Project Preview
                      </span>
                    </div>
                  )}

                  {/* Featured badge */}
                  {project.featured && (
                    <span className="absolute left-3 top-3 rounded-full border border-[#2DD4BF]/40 bg-[#042F2E] px-3 py-1 text-[11px] font-semibold text-[#5EEAD4]">
                      ✦ Featured
                    </span>
                  )}
                </div>

                {/* Project content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold tracking-[-0.02em] text-[var(--text-primary)]">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies?.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-[var(--border)] bg-[var(--bg-primary)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  {(project.githubUrl || project.liveUrl) && (
                    <div className="mt-5 flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--bg-surface-hover)]"
                        >
                          <FaGithub size={15} />
                          View Code
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--bg-surface-hover)]"
                        >
                          <ExternalLink size={15} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
