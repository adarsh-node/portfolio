import { Menu, Sun, Moon, X } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education",href: "#education",},
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg-surface)]">
      <nav className="mx-auto flex h-15 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-[var(--text-primary)]"
        >
          ADARSH
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="cursor-pointer hidden rounded-full p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)] md:flex"
        >
          {theme === "dark" ? (
            <Sun size={19} strokeWidth={1.8} />
          ) : (
            <Moon size={19} strokeWidth={1.8} />
          )}
        </button>

        {/* Mobile Controls */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2.5 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]"
          >
            {theme === "dark" ? (
              <Sun size={19} strokeWidth={1.8} />
            ) : (
              <Moon size={19} strokeWidth={1.8} />
            )}
          </button>

          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            className="rounded-full p-2.5 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]"
          >
            {isMenuOpen ? (
              <X size={21} strokeWidth={1.8} />
            ) : (
              <Menu size={21} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--bg-primary)] md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-[var(--border)] py-4 text-sm font-medium text-[var(--text-secondary)] transition-colors last:border-b-0 hover:text-[var(--text-primary)]"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
