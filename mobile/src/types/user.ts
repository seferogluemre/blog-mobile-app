export interface UserProfile {
  id: number;
  username: string;
  fullName: string;
  email?: string;
  role: 'admin' | 'author' | 'reader';
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileDropdownItem {
  label: string;
  icon: string;
  action: () => void;
}

export interface ProfileData {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'author' | 'reader';
  avatar?: string;
  createdAt: string;
  stats: ProfileStats;
}

export interface ProfileStats {
  postsCount: number;
  commentsCount: number;
  joinDate: string;
}

export interface ProfileInfoItem {
  icon: string;
  label: string;
  value: string;
} 