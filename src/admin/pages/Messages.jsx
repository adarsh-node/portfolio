import { useEffect, useState } from "react";
import { Check, Mail, MailOpen, Trash2 } from "lucide-react";

import AdminLayout from "../components/AdminLayout";

const API_URL = import.meta.env.VITE_API_URL;

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/api/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch messages");
      }

      setMessages(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSelectMessage = async (message) => {
    setSelectedMessage(message);

    if (message.isRead) return;

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/messages/${message._id}/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to mark message as read");
      }

      setMessages((currentMessages) =>
        currentMessages.map((item) =>
          item._id === message._id ? { ...item, isRead: true } : item,
        ),
      );

      setSelectedMessage(data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/api/messages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete message");
      }

      setMessages((currentMessages) =>
        currentMessages.filter((message) => message._id !== id),
      );

      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            Inbox
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-3xl">
            Messages
          </h1>

          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            View and manage messages submitted through your portfolio.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-8 text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              Loading messages...
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-surface)] p-10 text-center">
            <Mail size={28} className="mx-auto text-[var(--text-muted)]" />

            <h2 className="mt-3 text-base font-semibold text-[var(--text-primary)]">
              No messages yet
            </h2>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Messages submitted through your contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Message list */}
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
              <div className="border-b border-[var(--border)] px-4 py-3">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Inbox
                  <span className="ml-2 text-xs font-normal text-[var(--text-muted)]">
                    {messages.length}
                  </span>
                </p>
              </div>

              <div className="divide-y divide-[var(--border)]">
                {messages.map((message) => (
                  <button
                    key={message._id}
                    type="button"
                    onClick={() => handleSelectMessage(message)}
                    className={`group w-full cursor-pointer px-4 py-4 text-left transition-colors hover:bg-[var(--bg-surface-hover)] ${
                      selectedMessage?._id === message._id
                        ? "bg-[var(--bg-surface-hover)]"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 text-[var(--accent)]">
                        {message.isRead ? (
                          <MailOpen size={18} />
                        ) : (
                          <Mail size={18} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <p
                            className={`truncate text-sm ${
                              message.isRead ? "font-medium" : "font-bold"
                            } text-[var(--text-primary)]`}
                          >
                            {message.name}
                          </p>

                          <span className="shrink-0 text-[10px] text-[var(--text-muted)]">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <p
                          className={`mt-1 truncate text-xs ${
                            message.isRead
                              ? "text-[var(--text-secondary)]"
                              : "font-medium text-[var(--text-primary)]"
                          }`}
                        >
                          {message.subject}
                        </p>

                        <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message details */}
            <div className="min-h-[350px] rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
              {!selectedMessage ? (
                <div className="flex min-h-[350px] items-center justify-center p-8 text-center">
                  <div>
                    <MailOpen
                      size={28}
                      className="mx-auto text-[var(--text-muted)]"
                    />

                    <p className="mt-3 text-sm text-[var(--text-secondary)]">
                      Select a message to read it.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Details header */}
                  <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-5 py-4 sm:px-6">
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold text-[var(--text-primary)]">
                        {selectedMessage.subject}
                      </h2>

                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(selectedMessage._id)}
                      className="shrink-0 cursor-pointer rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:bg-red-500/10 hover:text-red-400"
                      aria-label="Delete message"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  {/* Sender */}
                  <div className="border-b border-[var(--border)] px-5 py-4 sm:px-6">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {selectedMessage.name}
                    </p>

                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="mt-1 block text-sm text-[var(--accent)] hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>

                  {/* Message */}
                  <div className="px-5 py-5 sm:px-6">
                    <p className="whitespace-pre-wrap text-sm leading-7 text-[var(--text-secondary)]">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-[var(--border)] px-5 py-4 sm:px-6">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                        selectedMessage.email,
                      )}&su=${encodeURIComponent(`Re: ${selectedMessage.subject}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
                    >
                      <Check size={16} />
                      Reply by Email
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Messages;
