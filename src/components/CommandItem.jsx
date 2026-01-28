const CommandItem = ({ label, active, onSelect, icon }) => {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl
        text-left font-body text-sm transition
        ${active
          ? "bg-primary text-neutral-white"
          : "text-neutral-dark dark:text-neutral-light hover:bg-neutral-light dark:hover:bg-neutral-darkest "}
      `}
    >
    
      <span className="flex-1 truncate">{label}</span>
    </button>
  );
};

export default CommandItem;
