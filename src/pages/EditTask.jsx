import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import { getTaskById, updateTask } from "../services/taskService";
import CustomDropdown from "../components/CustomDropdown";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomDateTimePicker from "../components/CustomDateTimePicker";
import PageTransition from "../components/PageTransition"
import Spinner from "../components/Spinner";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* Dropdown Options */
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const reminderTypeOptions = [
    { value: "once", label: "Once" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  /* Fetch Task */
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await getTaskById(id);
        setFormData({
          title: task.title || "",
          description: task.description || "",
          status: task.status || "pending",
          priority: task.priority || "medium",

          due_date: task.due_date
            ? new Date(task.due_date).toISOString().split("T")[0]
            : null,

          tags: task.tags || [],

          reminder_time: task.reminder_time || null,

          reminder_type: task.reminder_type || "once",
        });

      } catch (error) {
        navigate("/my-tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateTask(id, formData);

      toast.success("Task updated successfully");

      navigate("/my-tasks");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !formData) {
    return (
      <DashboardLayout>
        <div className="max-w-5xl mx-auto py-16 sm:py-20 text-center text-neutral-dark text-sm sm:text-base">
          Loading task...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
          <div className="bg-neutral-white dark:bg-neutral-dark rounded-2xl border border-neutral-light dark:border-neutral-dark shadow-sm p-5 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-neutral-darkest dark:text-neutral-white mb-6 sm:mb-8">
              Edit Task
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
              {/* Title */}
              <div>
                <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-white mb-2">
                  Title <span className="text-error ml-1 font-semibold">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full h-[48px] sm:h-[52px] px-4 border border-neutral-dark/30 dark:border-neutral-light/20 rounded-xl bg-neutral-white dark:bg-neutral-dark text-neutral-darkest dark:text-neutral-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-white mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="4"
                  className="w-full min-h-[100px] sm:min-h-[120px] px-4 py-3 border border-neutral-dark/30 dark:border-neutral-light/20 rounded-xl bg-neutral-white dark:bg-neutral-dark text-neutral-darkest dark:text-neutral-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Status / Priority / Due Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-white mb-2">
                    Status <span className="text-error ml-1 font-semibold">*</span>
                  </label>
                  <CustomDropdown
                    value={formData.status}
                    options={statusOptions}
                    onChange={(val) =>
                      setFormData({ ...formData, status: val })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-white mb-2">
                    Priority <span className="text-error ml-1 font-semibold">*</span>
                  </label>
                  <CustomDropdown
                    value={formData.priority}
                    options={priorityOptions}
                    onChange={(val) =>
                      setFormData({ ...formData, priority: val })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-white mb-2">
                    Due Date
                  </label>
                  <CustomDatePicker
                    value={formData.due_date}
                    onChange={(date) =>
                      setFormData({ ...formData, due_date: date || null })
                    }
                  />
                </div>
              </div>

              {/* Reminder */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-white mb-2">
                    Reminder Time
                  </label>
                  <CustomDateTimePicker
                    value={formData.reminder_time}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        reminder_time: val || null,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-white mb-2">
                    Reminder Type
                  </label>
                  <CustomDropdown
                    value={formData.reminder_type}
                    options={reminderTypeOptions}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        reminder_type: val,
                      })
                    }
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-neutral-light dark:border-neutral-dark">
                <button
                  type="button"
                  onClick={() => navigate("/my-tasks")}
                  className="w-full sm:w-auto px-6 h-[48px] sm:h-[52px] border border-neutral-light dark:border-neutral-darkest rounded-xl text-neutral-dark dark:text-neutral-light hover:bg-neutral-light dark:hover:bg-neutral-darkest transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 h-[52px] bg-primary text-neutral-white rounded-xl font-body font-medium shadow-sm
             hover:bg-primary-hover transition-colors
             disabled:opacity-70 disabled:cursor-not-allowed
             flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      Saving Changes
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default EditTask;
