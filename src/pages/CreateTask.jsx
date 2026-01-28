import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import { createTask } from "../services/taskService";
import CustomDropdown from "../components/CustomDropdown";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomDateTimePicker from "../components/CustomDateTimePicker";
import PageTransition from "../components/PageTransition";
import Spinner from "../components/Spinner";

const CreateTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    due_date: null,
    tags: [],
    reminder_time: null,
    reminder_type: "once",
  });

  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const Required = () => <span className="text-error ml-1">*</span>;
  const handleDropdownChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createTask(formData);

      toast.success("Task created successfully");

      navigate("/my-tasks");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };


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

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-neutral-white dark:bg-neutral-dark rounded-2xl border border-neutral-light dark:border-neutral-dark shadow-sm p-8">
            <h2 className="text-2xl font-heading font-semibold text-neutral-darkest dark:text-neutral-white mb-8">
              Create New Task
            </h2>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Title */}
              <div>
                <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-light mb-2">
                  Title <Required />
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter task title"
                  className="w-full h-[52px] px-4 border border-neutral-dark/30 dark:border-neutral-light/30 rounded-xl bg-neutral-white dark:bg-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary font-body text-neutral-dark dark:text-neutral-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-light mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  className="w-full min-h-[120px] px-4 py-3 border border-neutral-dark/30 dark:border-neutral-light/30 rounded-xl bg-neutral-white dark:bg-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary font-body text-neutral-dark dark:text-neutral-white resize-none"
                  rows="4"
                />
              </div>

              {/* Status, Priority, Due Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-light mb-2">
                    Status <Required />
                  </label>
                  <div className="h-[52px]">
                    <CustomDropdown
                      value={formData.status}
                      onChange={(val) => handleDropdownChange("status", val)}
                      options={statusOptions}
                      placeholder="Select Status"
                      className="h-[52px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-light  mb-2">
                    Priority <Required />
                  </label>
                  <div className="h-[52px] ">
                    <CustomDropdown
                      value={formData.priority}
                      onChange={(val) => handleDropdownChange("priority", val)}
                      options={priorityOptions}
                      placeholder="Select Priority"
                      className="h-[52px] "
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-light mb-2">
                    Due Date
                  </label>
                  <CustomDatePicker
                    value={formData.due_date}
                    onChange={(date) =>
                      setFormData((prev) => ({
                        ...prev,
                        due_date: date ? date : null,
                      }))
                    }
                  />

                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-light mb-2">
                  Tags
                </label>

                <div className="flex flex-wrap gap-2 mb-3 dark:bg-neutral-dark">
                  {formData.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-body flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-error hover:text-error-light font-semibold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 h-[52px] px-4 border border-neutral-dark/30 dark:border-neutral-light/30 rounded-xl bg-neutral-white dark:bg-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary font-body text-neutral-dark"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-6 h-[52px] bg-primary text-neutral-white rounded-xl hover:bg-primary-hover transition-colors font-body font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Reminder */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-light mb-2">
                    Reminder Time
                  </label>
                  <CustomDateTimePicker
                    value={formData.reminder_time}
                    onChange={(val) =>
                      setFormData((prev) => ({
                        ...prev,
                        reminder_time: val ? val : null,
                      }))
                    }
                  />


                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-neutral-dark dark:text-neutral-light mb-2">
                    Reminder Type
                  </label>
                  <div className="h-[52px]">
                    <CustomDropdown
                      value={formData.reminder_type}
                      onChange={(val) =>
                        handleDropdownChange("reminder_type", val)
                      }
                      options={reminderTypeOptions}
                      placeholder="Select Reminder Type"
                      className="h-[52px]"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-8 border-t border-neutral-light dark:border-neutral-dark">
                <button
                  type="button"
                  onClick={() => navigate("/my-tasks")}
                  className="px-6 h-[52px] border border-neutral-light dark:border-neutral-darkest text-neutral-dark dark:text-neutral-light rounded-xl hover:bg-neutral-light dark:hover:bg-neutral-darkest transition-colors font-body font-medium"
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
                      Creating…
                    </>
                  ) : (
                    "Create Task"
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

export default CreateTask;
