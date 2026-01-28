import { useState, useRef, useEffect } from "react";
import NotificationPanel from "./NotificationPanel";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="
          relative p-2.5 rounded-2xl
          hover:bg-neutral-light dark:hover:bg-neutral-dark
          transition
        "
      >
        <svg
          className="w-5 h-5 text-neutral-dark dark:text-neutral-light"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11
               a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341
               C7.67 6.165 6 8.388 6 11v3.159
               c0 .538-.214 1.055-.595 1.436L4 17h5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.73 21a2 2 0 01-3.46 0"
          />
        </svg>

        {/* Unread dot (dummy for now) */}
        <span className="
          absolute top-2 right-2
          w-2 h-2 rounded-full
          bg-primary
        " />
      </button>

      {/* Panel */}
      {open && <NotificationPanel />}
    </div>
  );
};

export default NotificationBell;
