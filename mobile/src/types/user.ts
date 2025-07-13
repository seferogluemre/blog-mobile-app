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