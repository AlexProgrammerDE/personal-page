export interface Organization {
  login: string;
  avatar: string;
  description: string;
}

export interface Repository {
  name: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
}

export interface UserData {
  avatar: string;
  name: string;
  bio: string;
  repoCount: number;
  followers: number;
}
