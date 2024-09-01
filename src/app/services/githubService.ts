import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface SearchCriteria {
  location?: string;
  language?: string;
  followers?: string;
  repos?: string;
  topics?: string;
  page?: number;
}

export interface Developer {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  location: string;
}

export const searchDevelopers = async (criteria: SearchCriteria): Promise<Developer[]> => {
  try {
    const response = await axios.post(`${API_URL}/external-contributors`, criteria);
    return response.data.map((dev: any) => ({
      id: dev.id,
      login: dev.login,
      avatar_url: dev.avatar_url,
      html_url: dev.html_url,
      public_repos: dev.public_repos,
      followers: dev.followers,
      location: dev.location,
    }));
  } catch (error) {
    console.error('Error searching developers:', error);
    throw error;
  }
};