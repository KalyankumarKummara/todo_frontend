import { useState } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "../services/taskService";

const ChangePasswordForm = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await updateProfile({ password });
      toast.success("Password updated");
      onClose();
    } catch {
      toast.error("Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 font-body">
      <label className="text-sm text-neutral-dark">
        New Password
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full h-11 px-4 pr-11
            rounded-xl 
            border border-neutral-dark/30 dark:border-neutral-light/20
            text-neutral-darkest dark:text-neutral-white
            focus:outline-none
            focus:ring-2 focus:ring-primary
          "
        />

        {/* Eye icon — ONLY hover / click controlled */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-neutral-dark dark:text-neutral-light
            transition-colors duration-200
            hover:text-primary
            active:text-primary
            focus-visible:text-primary
            focus:outline-none
          "
        >
          {showPassword ? (
            /* Eye Off */
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3l18 18M9.88 9.88a3 3 0 104.24 4.24"
              />
            </svg>
          ) : (
            /* Eye */
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="
          w-full py-2 rounded-xl
          bg-primary text-neutral-white
          font-body text-sm
          hover:bg-primary-hover
          disabled:opacity-50
          transition
        "
      >
        {loading ? "Updating..." : "Change Password"}
      </button>
    </div>
  );
};

export default ChangePasswordForm;
