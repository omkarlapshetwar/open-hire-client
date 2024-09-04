import ApiService from './apiService';
import { SearchCriteria, Developer, Repository, Contribution, DeveloperStats } from '../types/github';

export const searchDevelopers = async (criteria: SearchCriteria): Promise<Developer[]> => {
  try {
    const response = await ApiService.post('/api/external-contributors', criteria);
    return response.data;
  } catch (error) {
    console.error('Error searching developers:', error);
    throw error;
  }
};

export const getDeveloperProfile = async (username: string): Promise<Developer> => {
  try {
    const response = await ApiService.get(`/api/developer-profile/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching developer profile:', error);
    throw error;
  }
};

export const getDeveloperRepos = async (username: string): Promise<Repository[]> => {
  try {
    const response = await ApiService.get(`/api/developer-repos/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching developer repos:', error);
    throw error;
  }
};

export const getDeveloperContributions = async (username: string): Promise<Contribution[]> => {
  try {
    const response = await ApiService.get(`/api/developer-contributions/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching developer contributions:', error);
    throw error;
  }
};

export const getRepoPRs = async (username: string, owner: string, repo: string): Promise<any[]> => {
  try {
    const response = await ApiService.get(`/api/repo-prs/${username}/${owner}/${repo}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repo PRs:', error);
    throw error;
  }
};

export const getDeveloperStats = async (username: string): Promise<DeveloperStats> => {
  try {
    const response = await ApiService.get(`/api/developer-stats/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching developer stats:', error);
    throw error;
  }
};