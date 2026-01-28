const Spinner = ({ size = "md", variant = "primary" }) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  const colors = {
    primary: "from-primary to-primary-hover",
    accent: "from-accent to-accent-hover",
    success: "from-success to-success-light",
    error: "from-error to-error-light",
  };

  return (
    <div className={`relative ${sizes[size]}`}>

    <div className="absolute inset-0 rounded-full bg-primary opacity-20 dark:opacity-30 blur-md animate-pulse" />
      
      {/* Outer rotating ring */}
      <div
        className="absolute inset-0 rounded-full animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #4F46E5 30%, transparent 60%)",
        }}
      />

      {/* Inner rotating ring */}
      <div
        className="absolute inset-[5px] rounded-full animate-spin-fast"
        style={{
          background:
            "conic-gradient(from 180deg, transparent 0%, #6366F1 35%, transparent 70%)",
        }}
      />

      {/* Glass center */}
      <div className="absolute inset-[10px] rounded-full bg-neutral-white/80 dark:bg-neutral-dark/70 backdrop-blur-xl shadow-inner" />
    </div>
  );
};

export default Spinner;
