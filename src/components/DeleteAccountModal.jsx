import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteAccount, verifyPassword } from "../services/taskService";

const DeleteAccountModal = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    setLoading(true);

    try {
      await verifyPassword(password);
      await deleteAccount();
      toast.success("Account deleted successfully");
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Incorrect password");
      } else {
        toast.error("Failed to delete account");
      }
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 font-body">
      <p className="text-sm text-neutral-dark dark:text-neutral-light">
        Please confirm your password to permanently delete your account.
      </p>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="
          w-full h-11 px-4 rounded-xl
          border border-neutral-dark/30 dark:border-neutral-light/30
           bg-neutral-white dark:bg-neutral-dark text-neutral-darkest dark:text-neutral-white
          focus:outline-none focus:ring-2 focus:ring-error
        "
        placeholder="Enter your password"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-neutral-light text-neutral-dark dark:text-neutral-light dark:bg-neutral-dark                     hover:bg-neutral-dark  dark:hover:bg-neutral-darkest hover:text-neutral-white dark:hover:text-neutral-white
                     disabled:opacity-50 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-error text-neutral-white dark:text-neutral-white
                     hover:bg-error/90 disabled:opacity-50 transition"
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
