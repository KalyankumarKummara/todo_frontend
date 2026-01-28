import { useState, useEffect, useRef } from "react";

const CustomDropdown = ({ 
  value, 
  onChange, 
  options, 
  placeholder = "Select an option",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };
  
  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`w-full px-4 h-[48px] sm:h-[52px] border border-neutral-dark/30  dark:border-neutral-light/30 rounded-xl bg-neutral-white dark:bg-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary font-body transition-all flex items-center justify-between ${
          isOpen ? "ring-2 ring-primary" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`truncate text-sm sm:text-base ${value ? "text-neutral-darkest dark:text-neutral-white" : "text-neutral-dark dark:text-neutral-light"}`}>
          {displayText}
        </span>
        <svg
          className={`w-5 h-5 text-neutral-dark dark:text-neutral-light transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-1 bg-neutral-white dark:bg-neutral-dark border border-neutral-dark/30 dark:border-neutral-light/30 rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto overscroll-contain"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              className={`px-4 py-3 cursor-pointer transition-colors font-body text-sm sm:text-base ${
                value === option.value 
                  ? "bg-primary/10 dark:bg-primary/20 text-primary" 
                  : "hover:bg-neutral-light/50 dark:hover:bg-neutral-darkest text-neutral-darkest dark:text-neutral-white"
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
