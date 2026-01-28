import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy } from "react";
import App from './App.jsx'
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

const Signup = lazy(() => import("./pages/Signup.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Forgot_password = lazy(() => import("./pages/forgot_password.jsx"));
const Verify_otp = lazy(() => import("./pages/OTPVerification.jsx"))
const Reset_password = lazy(() => import("./pages/Reset_password.jsx"))
const Email_Verification = lazy(() => import("./pages/Email_Verification.jsx"))
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"))
const TasksPage = lazy(() => import("./pages/MyTasks.jsx"))
const CreateTask = lazy(() => import("./pages/CreateTask.jsx"))
const EditTask = lazy(() => import("./pages/EditTask.jsx"))
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Settings = lazy(() => import("./pages/Settings.jsx"));
const Search_result = lazy(() => import("./pages/SearchResults.jsx"));
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
         <Route path="/" element={<App />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/forgot-password" element={<Forgot_password />}></Route>
              <Route path="/verify-otp" element={<Verify_otp />}></Route>
              <Route path="/reset-password" element={<Reset_password />}></Route>
              <Route path="/verify-email" element={<Email_Verification />}></Route>

        <Route element={<ProtectedRoute />}>
           <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/my-tasks" element={<TasksPage />}></Route>
                <Route path="/create-task" element={<CreateTask />}></Route>
                <Route path="/edit-task/:id" element={<EditTask />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/search" element={<Search_result />}></Route>
          
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
