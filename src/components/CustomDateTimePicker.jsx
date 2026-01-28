import { useEffect, useRef, useState } from "react";

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CustomDateTimePicker = ({
  value,
  onChange,
  placeholder = "dd-mm-yyyy hh:mm",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("30");
  const [period, setPeriod] = useState("AM");

  const ref = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* Sync picker state from value (EDIT MODE FIX) */
  useEffect(() => {
    if (!value) return;

    const date = new Date(value); // UTC → local
    if (isNaN(date)) return;

    setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
    setSelectedDay(date.getDate());

    let h = date.getHours();
    const m = String(date.getMinutes()).padStart(2, "0");

    const p = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;

    setHour(String(h).padStart(2, "0"));
    setMinute(m);
    setPeriod(p);
  }, [value]);

  const y = viewDate.getFullYear();
  const m = viewDate.getMonth();
  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  /* Convert to 24h format */
  const to24h = () => {
    let h = Number(hour);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${minute}`;
  };

  /* Confirm selection (STORE AS UTC ISO) */
  const handleConfirm = () => {
    if (!selectedDay) return;

    const iso = new Date(
      `${y}-${String(m + 1).padStart(2, "0")}-${String(selectedDay).padStart(
        2,
        "0"
      )}T${to24h()}`
    ).toISOString();

    onChange(iso);
    setOpen(false);
  };

  /* Display value (LOCAL TIME) */
  const display = value
    ? (() => {
        const date = new Date(value);
        if (isNaN(date)) return placeholder;

        const d = String(date.getDate()).padStart(2, "0");
        const mo = String(date.getMonth() + 1).padStart(2, "0");
        const y = date.getFullYear();

        let h = date.getHours();
        const min = String(date.getMinutes()).padStart(2, "0");
        const p = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;

        return `${d}-${mo}-${y} · ${h}:${min} ${p}`;
      })()
    : placeholder;

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Input */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-[52px] px-4 flex items-center justify-between rounded-xl
          border border-neutral-dark/30 dark:border-neutral-light/30 bg-neutral-white dark:bg-neutral-dark font-body text-sm
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
        <div className="absolute z-50 mt-2 w-[320px] rounded-2xl bg-neutral-white border dark:bg-neutral-dark border-neutral-dark/30 dark:border-neutral-light/30 shadow-lg p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => setViewDate(new Date(y, m - 1, 1))}
              className="text-neutral-dark dark:text-neutral-light hover:text-primary"
            >
              ‹
            </button>

            <span className="font-heading text-sm font-semibold text-neutral-darkest dark:text-neutral-white">
              {viewDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>

            <button
              type="button"
              onClick={() => setViewDate(new Date(y, m + 1, 1))}
              className="text-neutral-dark dark:text-neutral-light hover:text-primary"
            >
              ›
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 text-xs text-neutral-dark dark:text-neutral-light mb-2">
            {weekDays.map((d) => (
              <div key={d} className="text-center">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-1 mb-5">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={i} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDay === day;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`h-8 w-8 rounded-lg text-xs transition ${
                    isSelected
                      ? "bg-primary text-neutral-white "
                      : "text-neutral-darkest dark:text-neutral-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Time */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-neutral-dark dark:text-neutral-light">Time</span>

            <div className="flex items-center gap-1">
              <input
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="w-10 h-8 text-center rounded-lg border border-neutral-dark/30 dark:border-neutral-light/30 text-neutral-darkest dark:text-neutral-white  bg-neutral-white dark:bg-neutral-dark text-sm focus:ring-1 focus:ring-primary/20"
              />
              :
              <input
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className="w-10 h-8 text-center rounded-lg border border-neutral-dark/30 dark:border-neutral-light/30 text-neutral-darkest dark:text-neutral-white  bg-neutral-white dark:bg-neutral-dark text-sm focus:ring-1 "
              />
              <button
                type="button"
                onClick={() => setPeriod(period === "AM" ? "PM" : "AM")}
                className="px-3 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary text-xs font-medium"
              >
                {period}
              </button>
            </div>
          </div>

          {/* Confirm */}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedDay}
            className={`w-full h-9 rounded-xl text-sm font-body transition ${
              selectedDay
                ? "bg-primary text-neutral-white dark:text-neutral-darkest hover:bg-primary-hover"
                : "bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light cursor-not-allowed"
            }`}
          >
            Set reminder
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomDateTimePicker;
