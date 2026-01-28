import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchTasks } from "../services/taskService";
import CommandItem from "./CommandItem";

const STATIC_COMMANDS = [
  { label: "Go to Dashboard", action: (nav) => nav("/dashboard") },
  { label: "My Tasks", action: (nav) => nav("/my-tasks") },
  { label: "Create Task", action: (nav) => nav("/create-task") },
  { label: "Profile", action: (nav) => nav("/profile") },
  { label: "Settings", action: (nav) => nav("/settings") },
];

const CommandPalette = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetch = async () => {
      const data = await searchTasks(query);
      setResults(data);
    };

    fetch();
  }, [query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const commandItems = STATIC_COMMANDS.map((c) => ({
    label: c.label,
    action: () => c.action(navigate),
  }));

  const taskItems = results.map((task) => ({
    label: task.title,
    action: () => navigate(`/edit-task/${task._id}`),
  }));

  const combined =
    query && taskItems.length > 0
      ? [...taskItems, ...commandItems]
      : [...commandItems, ...taskItems];

  return (
    <div className="fixed inset-0 z-50 bg-neutral-darkest/40 backdrop-blur-sm flex items-start justify-center pt-32">
      <div
        className="
          w-full max-w-xl
          bg-neutral-white dark:bg-neutral-dark
          rounded-2xl
          shadow-2xl
          border border-neutral-light dark:border-neutral-dark
          overflow-hidden
        "
      >
        {/* Input */}
        <div className="px-5 py-4 border-b border-neutral-light dark:border-neutral-darkest">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown")
                setActive((p) => Math.min(p + 1, combined.length - 1));
              if (e.key === "ArrowUp")
                setActive((p) => Math.max(p - 1, 0));
              if (e.key === "Enter") {
                combined[active]?.action();
                onClose();
              }
            }}
            placeholder="Search tasks or type a command…"
            className="
              w-full
              bg-transparent
              font-body text-sm
              text-neutral-darkest dark:text-neutral-white
              placeholder:text-neutral-dark dark:placeholder:text-neutral-light/60
              focus:outline-none
            "
          />
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto px-2 py-2 space-y-1">
          {combined.length === 0 ? (
            <p className="text-center text-sm font-body text-neutral-dark dark:text-neutral-light py-8">
              No results found
            </p>
          ) : (
            combined.map((item, index) => (
              <CommandItem
                key={index}
                active={index === active}
                label={item.label}
                onSelect={() => {
                  item.action();
                  onClose();
                }}
              />
            ))
          )}
        </div>

        {/* Footer hint */}
        <div
          className="
            px-5 py-3
            text-xs font-body
            text-neutral-dark dark:text-neutral-light
            border-t border-neutral-light dark:border-neutral-darkest
            flex justify-between
          "
        >
          <span>↑ ↓ Navigate</span>
          <span>Enter Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
