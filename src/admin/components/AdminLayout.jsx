import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen md:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-[var(--border)] bg-[var(--bg-surface)] px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)] md:hidden"
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

          <div className="ml-2 md:ml-0">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Admin Dashboard
            </p>
          </div>
        </header>

        <main className="p-5 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;