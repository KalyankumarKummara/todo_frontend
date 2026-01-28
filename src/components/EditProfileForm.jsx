import { useState } from "react";
import toast from "react-hot-toast";
import { updateProfile, getProfile } from "../services/taskService";

const EditProfileForm = ({ user, onSuccess }) => {
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await updateProfile({ username });
      const fresh = await getProfile();
      toast.success("Profile updated");
      onSuccess(fresh);
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-body text-neutral-dark dark:text-neutral-light">Username</label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
       className="
            w-full h-11 px-4 pr-11
            rounded-xl 
            border border-neutral-dark/30 dark:border-neutral-light/30
            text-neutral-darkest dark:text-neutral-white
            focus:outline-none
            focus:ring-2 focus:ring-primary
          "
      />

      <button 
      onClick={submit}
      disabled={loading}
      className="w-full bg-primary text-white  py-2 rounded-xl hover:bg-primary-hover disabled:opacity-50">
        Save Changes
      </button>
    </div>
  );
};

export default EditProfileForm;
