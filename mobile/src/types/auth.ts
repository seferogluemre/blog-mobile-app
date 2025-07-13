export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  username: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  fullName: string;
  email?: string;
  role: 'admin' | 'author' | 'reader';
  createdAt: string;
} 