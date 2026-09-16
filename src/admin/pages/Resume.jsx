import { useEffect, useRef, useState } from "react";
import {
  Upload,
  FileText,
  Download,
  Trash2,
  RefreshCw,
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/resume`;

function Resume() {
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getToken = () => localStorage.getItem("adminToken");

  const fetchResume = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (response.status === 404) {
        setResume(null);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch resume.");
      }

      const data = await response.json();
      setResume(data);
    } catch (err) {
      setError(err.message || "Failed to load resume.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setError("");
    setSuccess("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setSelectedFile(null);
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Resume must be smaller than 5MB.");
      setSelectedFile(null);
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF resume.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();
      formData.append("resume", selectedFile);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload resume.");
      }

      setResume(data.resume);
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setSuccess("Resume uploaded successfully.");
    } catch (err) {
      setError(err.message || "Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the current resume?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");
      setSuccess("");

      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete resume.");
      }

      setResume(null);
      setSuccess("Resume deleted successfully.");
    } catch (err) {
      setError(err.message || "Failed to delete resume.");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          Resume
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          Manage Resume
        </h1>

        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          Upload your latest resume and manage the version displayed on your
          portfolio.
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {success}
        </div>
      )}

      {/* Current Resume */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-[var(--text-primary)]">
              Current Resume
            </h2>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              The resume currently available on your portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchResume}
            disabled={loading}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Refresh resume"
          >
            <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="mt-5">
          {loading ? (
            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] p-4">
              <RefreshCw
                size={18}
                className="animate-spin text-[var(--accent)]"
              />
              <span className="text-sm text-[var(--text-secondary)]">
                Loading resume...
              </span>
            </div>
          ) : resume ? (
            <div className="flex flex-col gap-4 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                  <FileText size={21} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                    {resume.fileName}
                  </p>

                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Uploaded{" "}
                    {formatDate(resume.updatedAt || resume.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Download size={16} />
                  View
                </a>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[var(--border)] p-8 text-center">
              <FileText
                size={30}
                className="mx-auto text-[var(--text-muted)]"
              />

              <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">
                No resume uploaded
              </p>

              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Upload a PDF below to make it available on your portfolio.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Upload */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 sm:p-6">
        <div>
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            {resume ? "Replace Resume" : "Upload Resume"}
          </h2>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            PDF only · Maximum file size 5MB
          </p>
        </div>

        <div className="mt-5">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileChange}
            className="hidden"
            id="resume-upload"
          />

          <label
            htmlFor="resume-upload"
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[var(--border)] px-5 py-10 text-center transition hover:border-[var(--accent)] hover:bg-[var(--bg-surface-hover)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
              <Upload size={22} />
            </div>

            <p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
              Choose your resume PDF
            </p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Click here to browse files
            </p>
          </label>
        </div>

        {selectedFile && (
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <FileText
                size={20}
                className="shrink-0 text-[var(--accent)]"
              />

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Upload size={16} />
              {uploading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resume;