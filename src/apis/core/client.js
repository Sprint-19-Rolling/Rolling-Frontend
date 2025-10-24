import axios from 'axios';
import { handleError } from './errorHandler';

const createApiClientWithInterceptor = (baseURL) => {
  const client = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000,
  });
  client.interceptors.response.use((res) => res, handleError);
  return client;
};

//공통 API
export const apiClient = createApiClientWithInterceptor(
  import.meta.env.VITE_API_URL
);

// 팀 전용 API
export const teamClient = createApiClientWithInterceptor(
  import.meta.env.VITE_API_URL_TEAM
);

const createApiWrapper = (client) => ({
  get: (url, config = {}) => client.get(url, config),
  post: (url, data, config = {}) => client.post(url, data, config),
  put: (url, data, config = {}) => client.put(url, data, config),
  patch: (url, data, config = {}) => client.patch(url, data, config),
  delete: (url, config = {}) => client.delete(url, config),
});

//공통 API 함수
export const api = createApiWrapper(apiClient);

// 팀 전용 API 함수
export const teamApi = createApiWrapper(teamClient);
