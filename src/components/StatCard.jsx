const StatCard = ({ title, value, delta, color = "primary" }) => {
  const theme = {
    primary: {
      bg: "from-primary/30 to-primary-hover/30 dark:from-primary/60 dark:to-primary-hover/60",
      wave: "text-primary",
      text: "text-primary",
    },
    success: {
      bg: "from-success/30 to-success-light/30 dark:from-success/60 dark:to-success-light/60",
      wave: "text-success",
      text: "text-success",
    },
    accent: {
      bg: "from-accent/30 to-accent-hover/30 dark:from-accent/60 dark:to-accent-hover/60",
      wave: "text-accent",
      text: "text-accent",
    },
    error: {
      bg: "from-error/30 to-error-light/30 dark:from-error/60 dark:to-error-light/60",
      wave: "text-error",
      text: "text-error",
    },
  }[color];

  return (
    <div
      className="
        relative overflow-hidden rounded-2xl
        backdrop-blur-xl
        shadow-lg
        transition-all hover:-translate-y-1
      "
    >
      {/* Glass gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} `} />

      {/* Content */}
      <div className="relative z-10 p-6">
        <p className="text-sm font-body text-neutral-dark dark:text-neutral-light">
          {title}
        </p>

        <h3 className="text-3xl font-heading font-bold text-neutral-darkest dark:text-neutral-white mt-1">
          {value}
        </h3>

        {delta && (
          <p className={`mt-2 text-sm font-semibold ${theme.text}`}>
            {delta}
          </p>
        )}
      </div>

      {/* Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full h-20 "
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        
      >
        <path
          d="M0,90 C120,130 220,40 340,60 420,75 500,50 500,50 L500,150 L0,150 Z"
          className={`fill-current ${theme.wave}`}
          opacity="0.18"
        />
        <path
          d="M0,90 C120,130 220,40 340,60 420,75 500,50 500,50 L500,150 L0,150 Z"
          className={`fill-current ${theme.wave} hidden dark:block`}
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

export default StatCard;
