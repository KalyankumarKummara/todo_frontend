const colorMap = {
  primary: "bg-primary dark:opacity-90 dark:shadow-[0_0_8px_rgba(79,70,229,0.4)]",
  success: "bg-success dark:shadow-[0_0_8px_rgba(5,150,105,0.4)]",
  error: "bg-error dark:shadow-[0_0_8px_rgba(220,38,38,0.4)]",
  accent: "bg-accent dark:shadow-[0_0_8px_rgba(37,99,235,0.4)]",
};


const ProgressRow = ({ label, value, total, color = "primary" }) => {
  const percent = total ? Math.round((value / total) * 100) : 0;

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-body text-neutral-dark dark:text-neutral-light">
          {label}
        </span>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-neutral-dark dark:text-neutral-light">

            {value} / {total}
          </span>

          <span className="text-xs mb-2font-bold bg-neutral-light dark:bg-neutral-darkest text-neutral-darkest dark:text-neutral-white px-2.5 py-1 rounded-full dark:border border-neutral-dark">
            {percent}%
          </span>
        </div>
      </div>
      <div className="w-full h-3 bg-neutral-light dark:bg-neutral-dark/70 rounded-full">
        <div
          className={`h-full rounded-full ${colorMap[color]}transition-all duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
export default ProgressRow;