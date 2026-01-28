import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, deleteTask } from "../services/taskService";
import TaskCard from "../components/TaskCard";
import CustomDropdown from "../components/CustomDropdown";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import ConfirmModal from "../components/ConfirmModal";
import Spinner from "../components/Spinner";
import PageTransition from "../components/PageTransition";
import AnimatedPageHeader from "../components/AnimatedPageHeader"
import { motion } from "framer-motion";
import { listContainer } from "../animations/taskListAnimation";



const MyTasks = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, [search, status, priority]);

  const loadTasks = async () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (status) params.status = status;
    if (priority) params.priority = priority;
    const data = await getTasks(params);
    setTasks(data.tasks || []);
    setLoading(false);
  };

  const handleDeleteClick = (id) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(taskToDelete);
      toast.success("Task deleted successfully");
      loadTasks();
    } catch {
      toast.error("Failed to delete task");
    } finally {
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };


  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setPriority("");
  };

  const activeFiltersCount = [search, status, priority].filter(Boolean).length;

  const statusOptions = [
    { value: "", label: "Status" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" }
  ];

  const priorityOptions = [
    { value: "", label: "Priorities" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ];
  const handleExportCSV = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://todo-backend-6wde.onrender.com/tasks/export/csv",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "tasks.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      toast.error("Failed to export tasks");
    }
  };

  return (
    <DashboardLayout title="My Tasks" isModalOpen={showDeleteModal}>
      <PageTransition>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-start justify-between gap-4">
            <AnimatedPageHeader
              title="My Tasks"
              subtitle="Manage and track your tasks efficiently"
            />

            <button
              onClick={handleExportCSV}
              className="
      mt-1
      px-4 py-2
      rounded-xl
      border border-neutral-light dark:border-neutral-dark
      bg-neutral-light dark:bg-neutral-darkest
      text-sm font-body font-medium
      text-neutral-darkest dark:text-neutral-white
      hover:bg-neutral-light dark:hover:bg-neutral-darkest/40
      transition
      whitespace-nowrap
    "
            >
              Export CSV
            </button>
          </div>
          {/* Filter Section */}
          <div className="bg-neutral-white dark:bg-neutral-dark rounded-2xl shadow-sm border border-neutral-light/50 dark:border-neutral-dark p-4 sm:p-6 mb-8">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <h2 className="text-lg font-heading font-semibold text-neutral-darkest dark:text-neutral-white">
                  Filter & Search
                </h2>
                <div className="flex items-center gap-2">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="px-3 py-1 text-sm font-body text-error hover:bg-error/5 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Clear ({activeFiltersCount})
                    </button>
                  )}
                  <button
                    onClick={() => navigate('/create-task')}
                    className="hidden lg:flex px-3 py-3 text-sm font-body  bg-gradient-to-r from-primary to-primary-hover rounded-lg hover:bg-gradient-to-r hover:from-primary hover:to-accent text-white transition-colors"
                  >
                    + Create Task
                  </button>
                </div>
                <button
                  onClick={() => navigate("/create-task")}
                  className="sm:hidden fixed bottom-6 right-6 bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:opacity-90 transition-all z-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Search + Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-neutral-dark dark:text-neutral-light"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 h-[52px] border border-neutral-dark/30 dark:border-neutral-light/20  rounded-xl bg-neutral-white dark:bg-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary font-body transition-all"
                  />
                </div>

                <CustomDropdown
                  value={status}
                  onChange={setStatus}
                  options={statusOptions}
                  placeholder="All Status"
                />

                <CustomDropdown
                  value={priority}
                  onChange={setPriority}
                  options={priorityOptions}
                  placeholder="All Priorities"
                />
              </div>
            </div>
          </div>

          {/* Task List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Spinner size="lg" variant="primary" />
              <p className="text-sm font-body text-neutral-dark">
                Fetching your tasks…
              </p>
            </div>
          )

            : tasks.length > 0 ? (
              <motion.div
                variants={listContainer}
                initial="hidden"
                animate="show"
                className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
              >
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </motion.div>

            ) : (
              <div className="text-center py-20 px-4 sm:px-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-neutral-light rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-semibold text-neutral-darkest mb-2">
                  No tasks found
                </h3>
                <p className="text-neutral-dark font-body mb-6 text-sm sm:text-base">
                  {activeFiltersCount > 0
                    ? "Try adjusting your search or filters to find tasks."
                    : "Get started by creating your first task."}
                </p>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-primary text-neutral-white rounded-lg hover:bg-primary-hover font-body transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          <ConfirmModal
            isOpen={showDeleteModal}
            title="Delete Task"
            message="This action cannot be undone. Are you sure you want to delete this task?"
            confirmText="Delete"
            cancelText="Cancel"
            variant="error"
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={confirmDelete}
          />

        </div>
      </PageTransition>
    </DashboardLayout>
  );
};


export default MyTasks;
