import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../components/DashboardLayout";
import PageTransition from "../components/PageTransition";
import AnimatedPageHeader from "../components/AnimatedPageHeader";
import Spinner from "../components/Spinner";
import { searchTasks } from "../services/taskService";

const SearchResults = () => {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();
  const listRef = useRef(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await searchTasks(query);
        setResults(data);
        setActiveIndex(-1);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!results.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === "Enter" && activeIndex >= 0) {
        navigate(`/edit-task/${results[activeIndex]._id}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, results, navigate]);

  return (
    <DashboardLayout title="Search">
      <PageTransition>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <AnimatedPageHeader
            title="Search Results"
            subtitle={
              query
                ? `${results.length} result${results.length !== 1 ? "s" : ""} found for "${query}"`
                : "Type in the search bar to find your tasks"
            }
          />

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <Spinner size="lg" variant="primary" />
            </div>
          ) : results.length === 0 ? (
            <EmptyState query={query} />
          ) : (
            <div
              ref={listRef}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {results.map((item, index) => (
                <ResultCard
                  key={item._id}
                  item={item}
                  query={query}
                  active={index === activeIndex}
                  onClick={() => navigate(`/edit-task/${item._id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

const ResultCard = ({ item, query, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-5 border bg-neutral-white dark:bg-neutral-dark transition-all duration-300 ease-out ${
        active
          ? "border-primary shadow-lg -translate-y-1"
          : "border-neutral-dark/30 dark:border-neutral-light/20 hover:border-primary hover:shadow-lg hover:-translate-y-1"
      }`}
    >
      <h3 className="font-heading font-semibold text-base text-neutral-darkest dark:text-neutral-white leading-snug">
        <Highlight text={item.title} query={query} />
      </h3>

      {item.description && (
        <p className="mt-2 font-body text-sm text-neutral-dark dark:text-neutral-light line-clamp-2">
          <Highlight text={item.description} query={query} />
        </p>
      )}

      <div className="mt-4 pt-3 border-t border-neutral-light/60 dark:border-neutral-dark flex items-center justify-between text-xs font-body font-medium text-neutral-dark dark:text-neutral-light">
        <span>Open task</span>
        <svg
          className="w-4 h-4 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

const Highlight = ({ text, query }) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "ig");

  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="text-primary font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const EmptyState = ({ query }) => (
  <div className="text-center py-32 space-y-4">
    <div className="flex justify-center">
      <div className="w-16 h-16 rounded-full bg-neutral-light/40 dark:bg-neutral-dark/40 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-neutral-dark/50 dark:text-neutral-light/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>

    <h3 className="font-heading text-lg font-semibold text-neutral-darkest dark:text-neutral-white">
      {query ? "No results found" : "Search your tasks"}
    </h3>

    <p className="font-body text-sm text-neutral-dark dark:text-neutral-light max-w-md mx-auto">
      {query
        ? "Try a different keyword or shorter phrase."
        : "Use the search bar above to quickly find tasks by title or description."}
    </p>
  </div>
);

export default SearchResults;
