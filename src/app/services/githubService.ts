import axios, { AxiosError } from 'axios';
import { SearchCriteria, Developer, Repository, Contribution } from '../types/github';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to set the Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || 'An unexpected error occurred');
  }
  throw error;
};

export const searchDevelopers = async (criteria: SearchCriteria): Promise<Developer[]> => {
  try {
    const response = await api.post<Developer[]>('/external-contributors', criteria);
    return response.data;
  } catch (error) {
    console.error('Error searching developers:', error);
    throw handleApiError(error);
  }
};

export const getDeveloperProfile = async (username: string): Promise<Developer> => {
  try {
    const response = await api.get<Developer>(`/developer-profile/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching developer profile:', error);
    throw handleApiError(error);
  }
};

export const getDeveloperRepos = async (username: string): Promise<Repository[]> => {
  try {
    const response = await api.get<Repository[]>(`/developer-repos/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching developer repos:', error);
    throw handleApiError(error);
  }
};

export const getDeveloperContributions = async (username: string): Promise<Contribution[]> => {
  try {
    const response = await api.get<Contribution[]>(`/developer-contributions/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching developer contributions:', error);
    throw handleApiError(error);
  }
};