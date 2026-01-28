import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { listItem } from "../animations/taskListAnimation"
import {useTheme} from "../context/ThemeContext"

const TaskCard = ({ task, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";


  const getPriorityConfig = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return {
          color: 'bg-error text-neutral-white',
          glow: 'shadow-error/30',
          pulse: 'animate-pulse',
          gradient: 'from-error/20 to-transparent'
        };
      case 'medium':
        return {
          color: 'bg-accent text-neutral-white',
          glow: 'shadow-accent/30',
          pulse: '',
          gradient: 'from-accent/20 to-transparent'
        };
      case 'low':
        return {
          color: 'bg-success text-neutral-white',
          glow: 'shadow-success/30',
          pulse: '',
          gradient: 'from-success/20 to-transparent'
        };
      default:
        return {
          color: 'bg-neutral-light text-neutral-dark',
          glow: 'shadow-neutral-light/50',
          pulse: '',
          gradient: 'from-neutral-light/20 to-transparent'
        };
    }
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return { color: 'bg-success text-neutral-white', icon: 'check', glow: 'shadow-success/40' };
      case 'in progress':
        return { color: 'bg-primary text-neutral-white', icon: 'progress', glow: 'shadow-primary/40' };
      case 'pending':
        return { color: 'bg-accent text-neutral-white', icon: 'clock', glow: 'shadow-accent/40' };
      default:
        return { color: 'bg-neutral-light text-neutral-dark', icon: 'clock', glow: 'shadow-neutral-light/50' };
    }
  };

  const priorityConfig = getPriorityConfig(task.priority);
  const statusConfig = getStatusConfig(task.status);
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status?.toLowerCase() !== 'completed';

  return (
    <motion.div
      variants={listItem}
      className={`group relative bg-gradient-to-br from-neutral-white via-neutral-white to-neutral-light/30 dark:from-neutral-dark dark:via-neutral-darkest dark:to-neutral-dark/60
 rounded-3xl transition-all duration-700 ease-out transform ${isHovered ? 'scale-105 -translate-y-2' : 'scale-100'
        } ${isPressed ? 'scale-98' : ''} border border-neutral-light/30 dark:border-neutral-dark/50 backdrop-blur-sm overflow-hidden cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
  boxShadow: isHovered
    ? isDark
      ? '0 25px 50px -12px rgba(0,0,0,0.6)'
      : '0 25px 50px -12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)'
    : isDark
      ? '0 10px 25px -5px rgba(0,0,0,0.4)'
      : '0 10px 25px -5px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)'
}}
    >

      <div className={`absolute inset-0 bg-gradient-to-br ${priorityConfig.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

      <div className="relative p-8">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className={`font-heading text-neutral-darkest dark:text-neutral-white dark:group-hover:text-primary-hover font-bold leading-tight transition-all duration-500 truncate w-full ${isHovered ? 'text-primary text-3xl' : 'text-2xl'
              }`}>
              {task.title}
            </h3>
          </div>

          <p
            className={`font-body leading-relaxed transition-all duration-500 line-clamp-2 min-h-[52px] h-[2.5rem] ${task.description?.trim()
              ? "text-neutral-dark dark:text-neutral-light/80"
              : "text-neutral-dark dark:text-neutral-light/80"
              } ${isHovered ? "text-base" : "text-sm"}`}
          >
            {task.description?.trim() || "Description is not provided"}
          </p>

        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className={`group/tag relative inline-flex items-center dark:shadow-black/40 px-5 py-3 rounded-2xl text-sm font-semibold font-body transition-all duration-500 ${statusConfig.color} ${statusConfig.glow} ${isHovered ? 'scale-105 shadow-xl' : 'shadow-lg'
            }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-white/20 to-transparent rounded-2xl opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              {statusConfig.icon === 'check' && (
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {statusConfig.icon === 'progress' && (
                <div className="w-4 h-4 mr-2 relative">
                  <div className="absolute inset-0 border-2 border-current opacity-30 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-transparent border-t-current rounded-full animate-spin"></div>
                </div>
              )}
              {statusConfig.icon === 'clock' && (
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              )}
              {task.status || "Pending"}
            </div>
          </div>

          <div className={`group/tag relative inline-flex items-center px-5 py-3 rounded-2xl text-sm font-semibold font-body transition-all duration-500 ${priorityConfig.color} ${priorityConfig.glow} ${isHovered ? 'scale-105 shadow-xl' : 'shadow-lg'
            }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-white/20 to-transparent rounded-2xl opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <div className="flex mr-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-3 mx-0.5 rounded-full transition-all duration-300 ${(task.priority?.toLowerCase() === 'high' && i < 3) ||
                      (task.priority?.toLowerCase() === 'medium' && i < 2) ||
                      (task.priority?.toLowerCase() === 'low' && i < 1)
                      ? 'bg-current opacity-100'
                      : 'bg-current opacity-30'
                      }`}
                  />
                ))}
              </div>
              {task.priority || "Normal"}
            </div>
          </div>

          <div className={`group/tag relative inline-flex items-center px-5 py-3 rounded-2xl text-sm font-semibold font-body transition-all duration-500 shadow-lg ${isOverdue ? 'bg-error text-neutral-white shadow-error/40 animate-pulse' : 'bg-neutral-light text-neutral-dark dark:bg-neutral-dark dark:text-neutral-light '
            } ${isHovered ? 'scale-105 shadow-xl' : ''}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-white/20 to-transparent rounded-2xl opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {task.due_date ? new Date(task.due_date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              }) : "No deadline"}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/edit-task/${task._id}`}
            className={`group/btn flex-1 relative inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-accent to-accent-hover text-neutral-white dark:shadow-black/40 rounded-xl font-body font-medium text-sm transition-all duration-300 ease-out overflow-hidden ${isHovered ? 'shadow-lg shadow-accent/25 scale-[1.02]' : 'shadow-md shadow-accent/15'
              }`}
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)'
                : 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-white/15 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <svg className="w-4 h-4 mr-2 relative z-10 transition-transform duration-200 group-hover/btn:rotate-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span className="relative z-10 transition-all duration-200 group-hover/btn:tracking-wide">Edit</span>
          </Link>

          <button
            onClick={() => onDelete(task._id)}
            className={`group/btn flex-1 relative inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-error to-error-light text-neutral-white dark:shadow-black/40 rounded-xl font-body font-medium text-sm transition-all duration-300 ease-out overflow-hidden ${isHovered ? 'shadow-lg shadow-error/25 scale-[1.02]' : 'shadow-md shadow-error/15'
              }`}
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)'
                : 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-white/15 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-error-light to-error opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <svg className="w-4 h-4 mr-2 relative z-10 transition-transform duration-200 group-hover/btn:scale-105" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="relative z-10 transition-all duration-200 group-hover/btn:tracking-wide">Delete</span>
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>

      <div className="absolute -top-1 -left-1 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute -top-1 -right-1 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </motion.div>
  );
};

export default TaskCard;