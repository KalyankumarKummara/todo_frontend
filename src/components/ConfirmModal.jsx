import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "error",
}) => {
  const variants = {
    error: {
      button: "bg-error hover:bg-error-light",
      ring: "ring-error/30",
    },
    primary: {
      button: "bg-primary hover:bg-primary-hover",
      ring: "ring-primary/30",
    },
  };

  const theme = variants[variant];

  return (
    <AnimatePresence>
      {isOpen && (
       <motion.div
  className="
    fixed inset-0 z-[999]
    flex items-center justify-center
    bg-neutral-darkest/40
    backdrop-blur-md
    px-4
  "
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`w-full max-w-md rounded-2xl bg-neutral-white dark:bg-neutral-dark shadow-xl ring-1 ${theme.ring}`}
          >
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-heading font-semibold text-neutral-darkest dark:text-neutral-white">
                {title}
              </h3>

              <p className="text-sm font-body text-neutral-dark dark:text-neutral-light">
                {message}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 pb-6">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg text-sm font-body text-neutral-dark dark:text-neutral-light hover:bg-neutral-light dark:hover:bg-neutral-dark transition"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className={`px-5 py-2 rounded-lg text-sm font-body text-neutral-white transition ${theme.button}`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
