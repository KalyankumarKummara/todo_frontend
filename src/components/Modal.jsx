const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-[999] bg-neutral-darkest/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-white dark:bg-neutral-dark rounded-2xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-dark hover:text-neutral-darkest transition"
        >
          ✕
        </button>

        <h3 className="text-lg font-heading font-semibold text-neutral-darkest dark:text-neutral-white mb-4">
          {title}
        </h3>

        {children}
      </div>
    </div>
  );
};

export default Modal;
