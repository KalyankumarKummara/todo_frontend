import axios from "axios";

const API_URL = "https://todo-backend-6wde.onrender.com"

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};
export const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/user/profile`, getAuthHeader());
  console.log("Current user from API:", response.data);

  return response.data; 
};

export const createTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/tasks`, taskData, getAuthHeader());
  return response.data;
};

export const getTasks = async (params = {}) => {
  const response = await axios.get(`${API_URL}/tasks`, {
    ...getAuthHeader(),
    params,
  });
  return response.data;
};

export const getTaskById = async (taskId) => {
  const response = await axios.get(`${API_URL}/tasks/${taskId}`, getAuthHeader());
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, getAuthHeader());
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/tasks/${taskId}`, getAuthHeader());
  return response.data;
};

export const getTaskStats = async () => {
  const response = await axios.get(
    `${API_URL}/tasks/stats`,
    getAuthHeader()
  );
  return response.data;
};

export const getProfile = async () => {
  const response = await axios.get(
    `${API_URL}/user/profile`,
    getAuthHeader()
  );
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axios.put(
    `${API_URL}/user/profile`,
    data,
    getAuthHeader()
  );
  return response.data;
};

export const deleteAccount = async () => {
  const response = await axios.delete(
    `${API_URL}/users/me`,
    getAuthHeader()
  );
  return response.data;
};

export const verifyPassword = async (password) => {
  const response = await axios.post(
    `${API_URL}/users/verify-password`,
    { password },
    getAuthHeader()
  );
  return response.data;
};

export const searchTasks = async (query) => {
  const response = await axios.get(
    `${API_URL}/search?q=${encodeURIComponent(query)}`,
    getAuthHeader()
  );
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.replace(`${API_URL}/logout`);
};


