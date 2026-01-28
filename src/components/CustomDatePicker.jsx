import { useEffect, useRef, useState } from "react";

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "dd-mm-yyyy",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) =>
      ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const y = viewDate.getFullYear();
  const m = viewDate.getMonth();
  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const format = (date) =>
    `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;

  const display = value
  ? (() => {
      // handle both YYYY-MM-DD and ISO datetime
      const datePart = value.includes("T")
        ? value.split("T")[0]
        : value;

      const [y, m, d] = datePart.split("-");
      return `${d}-${m}-${y}`;
    })()
  : placeholder;


  const selectDate = (day) => {
    const yyyy = y;
    const mm = String(m + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");

    onChange(`${yyyy}-${mm}-${dd}`);
    setOpen(false);
  };


  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-[52px] px-4 flex items-center justify-between rounded-xl
          border border-neutral-dark/30 dark:border-neutral-light/20 bg-neutral-white  dark:bg-neutral-dark font-body
          focus:outline-none focus:ring-2 focus:ring-primary
          ${open ? "border-primary" : ""}`}
      >
        <span className={value ? "text-neutral-darkest dark:text-neutral-white" : "text-neutral-dark dark:text-neutral-light"}>
          {display}
        </span>

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
            d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-[300px] rounded-xl border border-neutral-dark/30 dark:border-neutral-light/20 bg-neutral-white dark:bg-neutral-dark shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setViewDate(new Date(y, m - 1, 1))}
              className="p-1 hover:bg-neutral-light dark:hover:bg-neutral-darkest rounded"
            >
              ‹
            </button>

            <span className="font-heading font-medium text-neutral-darkest  dark:text-neutral-white">
              {viewDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>

            <button
              type="button"
              onClick={() => setViewDate(new Date(y, m + 1, 1))}
              className="p-1 hover:bg-neutral-light rounded dark:hover:bg-neutral-darkest"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 text-xs text-neutral-dark dark:text-neutral-light mb-2">
            {weekDays.map((d) => (
              <div key={d} className="text-center">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={i} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected =
                value ===
                `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => selectDate(day)}
                  className={`h-9 w-9 rounded-lg text-sm transition
                    ${isSelected
                      ? "bg-primary dark:bg-primary-hover text-neutral-white"
                      : "hover:bg-neutral-light dark:hover:bg-neutral-darkest text-neutral-darkest dark:text-neutral-white"
                    }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
