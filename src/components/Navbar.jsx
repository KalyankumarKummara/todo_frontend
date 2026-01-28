import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import { logout } from "../services/taskService";

const Navbar = ({ title = "Dashboard", user, isModalOpen = false }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <header
      className={`
    sticky top-0 z-40
    h-16 sm:h-18 md:h-24
    flex items-center
    px-5 sm:px-8
    border-b border-neutral-light dark:border-neutral-dark
    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
    will-change-transform

    ${isModalOpen
          ? "bg-neutral-white dark:bg-neutral-dark shadow-sm"
          : "bg-neutral-white/90 dark:bg-neutral-dark/90 backdrop-blur-xl"
        }
  `}
    >
      <div
        className={`
      w-full flex items-center
      ${isModalOpen ? "pointer-events-none opacity-80" : "pointer-events-auto"}
    `}
      >
        {/* LEFT */}
        <div className="flex items-center gap-5 flex-1 min-w-0">
          <button
            className="lg:hidden p-2.5 rounded-xl hover:bg-neutral-light dark:hover:bg-neutral-dark transition"
          >
            <svg
              className="w-5 h-5 text-neutral-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex flex-col leading-tight">
            <h1 className="font-heading font-semibold text-lg sm:text-xl text-neutral-darkest dark:text-neutral-white truncate">
              {title}
            </h1>
            <span className="text-xs font-body text-neutral-dark dark:text-neutral-light hidden sm:block">
              Manage your tasks efficiently
            </span>
          </div>
        </div>

        {/* CENTER SEARCH */}
        <div className="hidden lg:flex flex-1 justify-center">
          <form autoComplete="off" className="w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
            <div
              className="
        h-11 flex items-center gap-3 px-4
        rounded-2xl border border-neutral-dark/30 dark:border-neutral-light/20
        bg-neutral-white dark:bg-neutral-dark  focus-within:ring-2 focus-within:ring-primary
        transition
      "
            >
              <span className="flex items-center justify-center w-5 h-5 flex-shrink-0">
                <svg
                  className="w-4 h-4 text-neutral-dark dark:text-neutral-light"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>

              <input
                type="search"
                name="q"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                inputMode="search"
                placeholder="Search tasks, reminders, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search.trim()) {
                    navigate(`/search?q=${encodeURIComponent(search.trim())}`)
                    setSearch("");
                  }
                }}
                className="
          w-full bg-transparent
          font-body text-sm text-neutral-darkest dark:text-neutral-white
          placeholder:text-neutral-dark dark:placeholder:text-neutral-light/60
          focus:outline-none
        "
              />
            </div>
          </form>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 sm:gap-6 flex-1 justify-end">
          <NotificationBell />

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-neutral-light dark:hover:bg-neutral-dark transition"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-semibold text-neutral-white">
                {user?.username?.[0]?.toUpperCase() || "U"}
              </div>

              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="text-sm font-body text-neutral-darkest dark:text-neutral-white">
                  {user?.username || "User"}
                </span>
                <span className="text-xs font-body text-neutral-dark dark:text-neutral-light">
                  {user?.email || "user@email.com"}
                </span>
              </div>

              <svg
                className="w-4 h-4 text-neutral-dark dark:text-neutral-light hidden md:block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-52 rounded-2xl bg-neutral-white dark:bg-neutral-dark  border border-neutral-light dark:border-neutral-dark shadow-xl overflow-hidden">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full px-4 py-3 text-left text-sm font-body hover:bg-neutral-light dark:text-neutral-white dark:hover:bg-neutral-darkest">
                  Profile
                </button>
                <button 
                onClick={() => navigate("/settings")}
                className="w-full px-4 py-3 text-left text-sm font-body hover:bg-neutral-light dark:text-neutral-white dark:hover:bg-neutral-darkest">
                  Settings
                </button>
                <button
                  onClick={logout}
                  className="w-full px-4 py-3 text-left text-sm font-body text-error hover:bg-error/10 dark:hover:bg-error/20"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
