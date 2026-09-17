import axios from 'axios';

// Create a dedicated instance instead of configuring the global axios object
const SERVER = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Helpers for token storage ---
const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);
const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// --- REQUEST INTERCEPTOR ---
// Blocks the request before it's sent if there's no valid token,
// and attaches the Authorization header otherwise.
SERVER.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    // Allow certain public endpoints to skip the auth check
    const isPublicEndpoint = config.url?.includes('/auth/login') ||
                              config.url?.includes('/auth/register');

    if (!token && !isPublicEndpoint) {
      // Reject before the request is even sent
      return Promise.reject(
        new axios.Cancel('No auth token found — request blocked')
      );
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --- RESPONSE INTERCEPTOR ---
// Handles 401/403 responses, attempts a token refresh once,
// and blocks/retries requests accordingly.
let isRefreshing = false;
let failedQueue = [] as any[];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

SERVER.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Not an HTTP error (e.g. request blocked in request interceptor)
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue up requests while a refresh is already in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return SERVER(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token available');

        const { data } = await axios.post(
          `${SERVER.defaults.baseURL}/auth/refresh`,
          { refreshToken }
        );

        setAccessToken(data.accessToken);
        SERVER.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return SERVER(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        // Redirect to login, or emit an event your app listens for
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 403) {
      // Authenticated but not authorized — block and surface it
      console.warn('Forbidden: insufficient permissions for this request');
    }

    return Promise.reject(error);
  }
);

export default SERVER;

