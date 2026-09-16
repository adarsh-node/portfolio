import { useState } from "react";
import { Image, Link, Save, Upload, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const API_URL = import.meta.env.VITE_API_URL;

function ProjectForm({ project = null, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    technologies: project?.technologies?.join(", ") || "",
    githubUrl: project?.githubUrl || "",
    liveUrl: project?.liveUrl || "",
    featured: project?.featured || false,
    order: project?.order ?? 0,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(project?.image || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(project);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB.");
      return;
    }

    setError("");
    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const uploadImage = async () => {
    if (!imageFile) {
      return formData.image;
    }

    const token = localStorage.getItem("adminToken");

    const uploadData = new FormData();
    uploadData.append("image", imageFile);

    const response = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: uploadData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Image upload failed");
    }

    return data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Project title is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Project description is required.");
      return;
    }

    try {
      setLoading(true);

      // Upload image first if a new image was selected
      const imageUrl = await uploadImage();

      const technologies = formData.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: imageUrl || "",
        technologies,
        githubUrl: formData.githubUrl.trim(),
        liveUrl: formData.liveUrl.trim(),
        featured: formData.featured,
        order: Number(formData.order) || 0,
      };

      const token = localStorage.getItem("adminToken");

      const url = isEditing
        ? `${API_URL}/api/projects/${project._id}`
        : `${API_URL}/api/projects`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save project");
      }

      onSuccess(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:p-6">
      <div className="my-4 w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] shadow-2xl sm:my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
              {isEditing ? "Edit Project" : "New Project"}
            </p>

            <h2 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
              {isEditing ? "Update project" : "Add a project"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]"
            aria-label="Close form"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
            >
              Project Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. NGO CMS"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what the project does..."
              className="w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3.5 py-2.5 text-sm leading-6 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
              <Image size={16} />
              Project Image
            </label>

            <div className="overflow-hidden rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-primary)]">
              {imagePreview ? (
                <div className="relative aspect-video">
                  <img
                    src={imagePreview}
                    alt="Project preview"
                    className="h-full w-full object-cover"
                  />

                  <label className="absolute bottom-3 right-3 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-black/70 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/85">
                    <Upload size={14} />
                    Change Image

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center px-5 py-10 text-center transition-colors hover:bg-[var(--bg-surface-hover)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--accent)]">
                    <Upload size={19} />
                  </div>

                  <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">
                    Choose project image
                  </p>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    PNG, JPG, WEBP up to 5 MB
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {imageFile && (
              <p className="mt-2 truncate text-xs text-[var(--text-muted)]">
                Selected: {imageFile.name}
              </p>
            )}
          </div>

          {/* Technologies */}
          <div>
            <label
              htmlFor="technologies"
              className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
            >
              Technologies
            </label>

            <input
              id="technologies"
              name="technologies"
              type="text"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB, Tailwind CSS"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
            />

            <p className="mt-1.5 text-xs text-[var(--text-muted)]">
              Separate technologies with commas.
            </p>
          </div>

          {/* URLs */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="githubUrl"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]"
              >
                <FaGithub size={16} />
                GitHub URL
              </label>

              <input
                id="githubUrl"
                name="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label
                htmlFor="liveUrl"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]"
              >
                <Link size={16} />
                Live URL
              </label>

              <input
                id="liveUrl"
                name="liveUrl"
                type="url"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
              />
            </div>
          </div>

          {/* Featured + Order */}
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 accent-[var(--accent)]"
              />

              <span>
                <span className="block text-sm font-medium text-[var(--text-primary)]">
                  Featured Project
                </span>

                <span className="block text-xs text-[var(--text-muted)]">
                  Highlight this project
                </span>
              </span>
            </label>

            <div>
              <label
                htmlFor="order"
                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
              >
                Display Order
              </label>

              <input
                id="order"
                name="order"
                type="number"
                min="0"
                value={formData.order}
                onChange={handleChange}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cursor-pointer rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />
              {loading
                ? "Saving..."
                : isEditing
                  ? "Update Project"
                  : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;