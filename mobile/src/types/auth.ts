import { User, UserRole } from "./user";

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

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  password: string;
  role: UserRole;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  data: User;
}

export interface AuthUser extends User {
  tokens: AuthTokens;
}