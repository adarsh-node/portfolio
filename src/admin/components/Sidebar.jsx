import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  FileText,
  LogOut,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";


function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login", { replace: true });
  };

  const links = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: FolderKanban,
    },
    {
  name: "Resume",
  path: "/admin/resume",
  icon: FileText,
},
    {
      name: "Messages",
      path: "/admin/messages",
      icon: MessageSquare,
    },
    
  ];

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-[var(--border)] bg-[var(--bg-surface)] transition-transform duration-200 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-[var(--border)] px-5">
          <div>
            <p className="text-sm font-bold tracking-wide text-[var(--text-primary)]">
              ADARSH
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Admin CMS
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)] md:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--bg-surface-hover)] text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]"
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.8} />
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-[var(--border)] p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]"
          >
            <LogOut size={18} strokeWidth={1.8} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;