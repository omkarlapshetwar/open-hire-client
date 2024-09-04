export interface SearchCriteria {
    q?: string;
    location?: string;
    language?: string;
    followers?: number;
    repos?: number;
    topics?: string[];
    page?: number;
    perPage?: number;
  }
  
  export interface Developer {
    id: number;
    login: string;
    name: string | null;
    avatar_url: string;
    html_url: string;
    bio: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    location: string | null;
    blog: string | null;
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
  
  export interface DeveloperStats {
    totalContributions: number;
    longestStreak: number;
    contributionCalendar: {
      day: string;
      value: number;
    }[];
    averageCommitFrequency: number;
    codeReviewParticipation: number;
    pullRequestMergeRatio: number;
    organizationsContributedTo: number;
    openSourceProjectsContributedTo: number;
  }