import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/taskService";
import { useCommandPalette } from "../hooks/useCommandPalette";
import CommandPalette from "./CommandPalette";
import {useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import AppFooter from "./Footer"


const Sidebar = ({ user }) => {
  const [active, setActive] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
        </svg>
      )
    },
    {
      key: "my_tasks",
      label: "My Tasks",
      path: "/my-tasks",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      key: "settings",
      label: "Settings",
      path: "/settings",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const closeMobile = () => setIsMobileOpen(false);

  useEffect(() => {
    const current = menuItems.find(item =>
      location.pathname.startsWith(item.path)
    );
    if (current) {
      setActive(current.key);
    }
  }, [location.pathname]);

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-neutral-darkest bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      <button
        onClick={toggleMobile}
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-neutral-white p-2 rounded-lg shadow-lg hover:bg-primary-hover transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div
        className={`
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64 sm:w-60 md:w-64 lg:w-64 xl:w-72
          bg-gradient-to-b from-neutral-white to-neutral-light
          dark:from-neutral-dark dark:to-neutral-darkest
          h-screen shadow-2xl flex flex-col fixed left-0 top-0 z-50 lg:z-auto
          transition-all duration-300 ease-in-out
          border-r border-neutral-light  dark:border-neutral-dark
        `}
      >

        <div className="absolute top-24 left-0 w-full h-px bg-neutral-light dark:bg-neutral-dark"></div>

        <div className="p-6 border-neutral-light bg-neutral-white dark:bg-neutral-dark relative flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-neutral-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-heading font-bold text-neutral-darkest dark:text-neutral-white">TodoPro</h1>
                <p className="text-xs md:text-sm font-body text-neutral-dark dark:text-neutral-light opacity-75">Task Management</p>
              </div>
            </div>

            <button
              onClick={closeMobile}
              className="lg:hidden p-1.5 rounded-lg hover:bg-neutral-light  transition-colors text-neutral-dark"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`
                w-full group flex items-center space-x-3 px-4 py-3 rounded-xl font-body font-medium
                transition-all duration-200 ease-in-out relative overflow-hidden
                ${active === item.key
                  ? 'bg-gradient-to-r from-primary to-primary-hover text-neutral-white shadow-lg transform scale-[1.02]'
                  : 'text-neutral-dark hover:bg-neutral-light hover:text-neutral-darkest dark:text-neutral-light dark:hover:bg-neutral-dark dark:hover:text-neutral-white hover:transform hover:scale-[1.02]'
                }
              `}
              onClick={() => {
                setActive(item.key);
                navigate(item.path);
                closeMobile();
              }}
            >
              <div
                className={`
                  flex-shrink-0 transition-transform duration-200
                  ${active === item.key ? 'scale-110' : 'group-hover:scale-110'}
                `}
              >
                {item.icon}
              </div>

              <span className="flex-1 text-left transition-all duration-200 text-sm md:text-base">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-light dark:border-neutral-dark bg-neutral-white dark:bg-neutral-dark flex-shrink-0">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-primary to-accent text-neutral-white">
            <div className="w-8 h-8 bg-neutral-white bg-opacity-20 dark:bg-neutral-dark dark:bg-opacity-40 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body font-medium dark:text-neutral-white text-sm truncate">{user?.username}</p>
              <p className="font-body text-xs dark:text-neutral-white opacity-75 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DashboardLayout = ({ children, title, isModalOpen = false }) => {
  const [user, setUser] = useState(null);
  const {open, setOpen} = useCommandPalette();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        console.log("Current user:", data);
        console.log("User id :", user?._id)
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen bg-neutral-light dark:bg-neutral-darkest">
      <Sidebar user={user} />

      <div
        className={`
    flex-1 flex flex-col
    transition-[margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
    will-change-[margin]
    ${isModalOpen ? "ml-0" : "lg:ml-64 xl:ml-72"}
  `}
      >


        {/* Navbar goes here */}
        <Navbar title={title} user={user} isModalOpen={isModalOpen} />

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 text-neutral-darkest dark:text-neutral-white">
          {children}
        </main>
        <AppFooter />
      </div>
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </div>

  );
};

export default DashboardLayout;
