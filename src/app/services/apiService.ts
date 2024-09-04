import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response) {
          throw {
            message: error.response.data && typeof error.response.data === 'object' && 'error' in error.response.data
              ? error.response.data.error
              : 'An unexpected error occurred',
            statusCode: error.response.status
          };
        }
        throw { message: 'Network error', statusCode: 0 };
      }
    );
  }

  async get(url: string, config?: AxiosRequestConfig) {
    return this.api.get(url, config);
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.api.post(url, data, config);
  }

  async put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.api.put(url, data, config);
  }

  async delete(url: string, config?: AxiosRequestConfig) {
    return this.api.delete(url, config);
  }
}

export default new ApiService();