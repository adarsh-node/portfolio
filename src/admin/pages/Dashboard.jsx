import { useEffect, useState } from "react";
import { FolderKanban, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    unreadMessages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("adminToken");

        const [projectsResponse, messagesResponse] = await Promise.all([
          fetch(`${API_URL}/api/projects`),
          fetch(`${API_URL}/api/messages`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const projectsData = await projectsResponse.json();
        const messagesData = await messagesResponse.json();

        if (!projectsResponse.ok) {
          throw new Error(
            projectsData.message || "Failed to fetch projects"
          );
        }

        if (!messagesResponse.ok) {
          throw new Error(
            messagesData.message || "Failed to fetch messages"
          );
        }

        const unreadMessages = messagesData.filter(
          (message) => !message.isRead
        ).length;

        setStats({
          projects: projectsData.length,
          messages: messagesData.length,
          unreadMessages,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            Overview
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            Manage your portfolio content and incoming messages.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* Projects */}
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="group cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--bg-surface-hover)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Projects
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                  {loading ? "—" : stats.projects}
                </p>

                <p className="mt-2 text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)]">
                  Manage projects →
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--accent)]">
                <FolderKanban size={20} />
              </div>
            </div>
          </button>

          {/* Messages */}
          <button
            type="button"
            onClick={() => navigate("/admin/messages")}
            className="group cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--bg-surface-hover)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Messages
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                  {loading ? "—" : stats.messages}
                </p>

                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  {loading ? (
                    "Loading..."
                  ) : (
                    <>
                      <span className="text-[var(--accent)]">
                        {stats.unreadMessages}
                      </span>{" "}
                      unread
                    </>
                  )}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--accent)]">
                <MessageSquare size={20} />
              </div>
            </div>
          </button>
        </div>

        {/* Quick overview */}
        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 sm:p-6">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            Quick overview
          </h2>

          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            Your dashboard statistics are connected directly to your
            portfolio database.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;