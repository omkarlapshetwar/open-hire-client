export interface SearchCriteria {
    location?: string;
    language?: string;
    followers?: number;
    repos?: number;
    topics?: string[];
    page?: number;
  }
  
  export interface Developer {
    id: number;
    login: string;
    name: string | null;
    avatar_url: string;
    html_url: string;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
    location: string | null;
    created_at: string;
  }
  
  export interface Repository {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    created_at: string;
  }
  
  export interface Contribution {
    repo: string;
    html_url: string;
    count: number;
  }

  export interface Contribution {
    repo: string;
    count: number;
    html_url: string;
  }