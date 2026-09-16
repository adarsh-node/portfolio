import { useEffect, useState } from "react";
import {
  ExternalLink,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import { FaGithub } from "react-icons/fa6";

import AdminLayout from "../components/AdminLayout";
import ProjectForm from "../components/ProjectForm";

const API_URL = import.meta.env.VITE_API_URL;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

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

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete project");
      }

      setProjects((currentProjects) =>
        currentProjects.filter((project) => project._id !== id),
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
              Content
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-3xl">
              Projects
            </h1>

            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              Add and manage the projects displayed on your portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingProject(null);
              setShowForm(true);
            }}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            <Plus size={17} />
            Add Project
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-8 text-center text-sm text-[var(--text-secondary)]">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-surface)] p-10 text-center">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">
              No projects yet
            </h2>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Add your first project to start building your portfolio.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project._id}
                className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]"
              >
                <div className="aspect-video overflow-hidden border-b border-[var(--border)] bg-[var(--bg-primary)]">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">
                      No image
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-semibold text-[var(--text-primary)]">
                        {project.title}
                      </h2>

                      {project.featured && (
                        <span className="mt-2 inline-block rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--accent)]">
                          Featured
                        </span>
                      )}
                    </div>

                    <span className="text-xs text-[var(--text-muted)]">
                      #{project.order}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies?.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-[var(--border)] bg-[var(--bg-primary)] px-2.5 py-1 text-[10px] font-medium text-[var(--text-secondary)]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor-pointer rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]"
                          aria-label="View GitHub"
                        >
                          <FaGithub size={17} />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor-pointer rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]"
                          aria-label="View live project"
                        >
                          <ExternalLink size={17} />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject(project);
                          setShowForm(true);
                        }}
                        className="cursor-pointer rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]"
                        aria-label={`Edit ${project.title}`}
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(project._id)}
                        className="cursor-pointer rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-400"
                        aria-label={`Delete ${project.title}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
          onSuccess={() => {
            setShowForm(false);
            setEditingProject(null);
            fetchProjects();
          }}
        />
      )}
    </AdminLayout>
  );
}

export default Projects;