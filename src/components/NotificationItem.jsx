const NotificationItem = ({ title, meta, variant }) => {
  const accent =
    variant === "overdue"
      ? "bg-error/10 dark : bg-error/30"
      : "bg-primary/10 dark : bg-primary/30";

  return (
    <div
      className="
        group mx-3 px-4 py-3 rounded-xl
        hover:bg-neutral-light dark:hover:bg-neutral-darkest
        transition
        cursor-pointer
      "
    >
      <div className="flex items-start gap-3">
        {/* Accent bar */}
        <span
          className={`mt-1 h-8 w-1 rounded-full ${accent}`}
        />

        <div className="flex-1">
          <p className="font-body text-sm font-medium text-neutral-darkest dark:text-neutral-white group-hover:text-primary transition-colors">
            {title}
          </p>
          <p className="mt-1 text-xs font-body text-neutral-dark dark:text-neutral-light/70">
            {meta}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;

