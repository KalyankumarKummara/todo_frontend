import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { getTasks } from "../services/taskService";

const NotificationPanel = () => {
    const [loading, setLoading] = useState(true);
    const [overdue, setOverdue] = useState([]);
    const [upcoming, setUpcoming] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await getTasks();

                const tasks = Array.isArray(response)
                    ? response
                    : response.tasks || [];

                const overdueTasks = [];
                const upcomingTasks = [];

                const nowTs = Date.now();
                const next24hTs = nowTs + 24 * 60 * 60 * 1000;

                tasks.forEach((task) => {
                    const reminder = task.reminder_time || task.due_date;
                    if (!reminder) return;

                    const status = task.status?.toLowerCase();
                    if (["completed", "done"].includes(status)) return;

                    const dueTs = parseReminder(reminder);
                    if (isNaN(dueTs)) return;

                    if (dueTs < nowTs) {
                        overdueTasks.push(task);
                    } else if (dueTs <= next24hTs) {
                        upcomingTasks.push(task);
                    }
                });

                setOverdue(overdueTasks);
                setUpcoming(upcomingTasks);
            } catch (err) {
                console.error("Failed to fetch notifications", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

  return (
  <div
  className="
    absolute z-50
    top-14 right-0
    sm:top-12
    sm:right-0
    left-1/2 sm:left-auto
    -translate-x-1/2 sm:translate-x-0

    w-[92vw]
    max-w-[26rem]

    bg-neutral-white dark:bg-neutral-dark
    rounded-2xl
    shadow-2xl
    border border-neutral-light dark:border-neutral-dark
    overflow-hidden
  "
>
    {/* Header */}
    <div className="px-6 py-5 border-b border-neutral-light dark:border-neutral-dark">
      <h3 className="font-heading text-lg font-semibold text-neutral-darkest dark:text-neutral-white">
        Notifications
      </h3>
      <p className="mt-1 text-xs font-body text-neutral-dark dark:text-neutral-light">
        Reminders & deadlines
      </p>
    </div>

    {/* Content */}
    <div className="max-h-[26rem] overflow-y-auto">
      {loading ? (
        <div className="px-6 py-10 text-sm font-body text-neutral-dark dark:text-neutral-light">
          Loading reminders…
        </div>
      ) : (
        <>
          {overdue.length > 0 && (
            <Section title="Overdue">
              {overdue.map((task) => (
                <NotificationItem
                  key={task._id}
                  title={task.title}
                  meta={`Overdue • ${formatDate(
                    task.reminder_time || task.due_date
                  )}`}
                  variant="overdue"
                />
              ))}
            </Section>
          )}

          {upcoming.length > 0 && (
            <Section title="Due Soon">
              {upcoming.map((task) => (
                <NotificationItem
                  key={task._id}
                  title={task.title}
                  meta={
                    task.reminder_time
                      ? `Due ${formatTime(task.reminder_time)}`
                      : `Due ${formatDate(task.due_date)}`
                  }
                  variant="upcoming"
                />
              ))}
            </Section>
          )}

          {overdue.length === 0 && upcoming.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="font-heading text-sm font-medium text-neutral-darkest dark:text-neutral-white">
                You’re all caught up
              </p>
              <p className="mt-1 text-xs font-body text-neutral-dark dark:text-neutral-light">
                No urgent tasks right now
              </p>
            </div>
          )}
        </>
      )}
    </div>

    {/* Footer */}
    <div className="px-6 py-4 border-t border-neutral-light dark:border-neutral-dark bg-neutral-light/40 dark:bg-neutral-darkest">
      <p className="text-xs font-body text-neutral-dark dark:text-neutral-light">
        Stay focused. Stay ahead.
      </p>
    </div>
  </div>
);

};

export default NotificationPanel;

/* ---------- helpers ---------- */

const Section = ({ title, children }) => (
  <div className="py-3">
    <p
      className="
        px-6 py-2
        text-[11px] font-body font-semibold
        uppercase tracking-wide
        text-neutral-dark dark:text-neutral-light
      "
    >
      {title}
    </p>

    <div className="space-y-1">
      {children}
    </div>
  </div>
);


const parseReminder = (value) => {
    // Case 1: already a number (timestamp)
    if (typeof value === "number") return value;

    // Case 2: MongoDB Extended JSON
    if (
        typeof value === "object" &&
        value?.$date?.$numberLong
    ) {
        return Number(value.$date.$numberLong);
    }

    // Case 3: ISO string
    if (typeof value === "string" && !isNaN(Date.parse(value))) {
        return Date.parse(value);
    }

    // Case 4: UI formatted string "DD-MM-YYYY · hh:mm AM/PM"
    if (typeof value === "string" && value.includes("·")) {
        const cleaned = value.replace(" · ", " ");
        const [datePart, timePart, meridiem] = cleaned.split(" ");
        if (!datePart || !timePart || !meridiem) return NaN;

        const [dd, mm, yyyy] = datePart.split("-").map(Number);
        let [hh, min] = timePart.split(":").map(Number);

        if (meridiem === "PM" && hh !== 12) hh += 12;
        if (meridiem === "AM" && hh === 12) hh = 0;

        return new Date(yyyy, mm - 1, dd, hh, min).getTime();
    }

    return NaN;
};

const formatDate = (dateStr) =>
    new Date(parseReminder(dateStr)).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });


const formatTime = (dateStr) =>
    new Date(parseReminder(dateStr)).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
    });


