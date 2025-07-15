import { AuthTokens, LoginRequest, RegisterRequest } from "@/types/auth";
import { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthApiService } from "../api/authApi";
import { StorageService } from "../storage";


export const AUTH_QUERY_KEYS = {
  currentUser: ['auth', 'currentUser'] as const,
  me: ['auth', 'me'] as const,
};

const queryClient = useQueryClient();

export const useCurrentUser = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.currentUser,
    queryFn: async (): Promise<User | null> => {
      const token = await StorageService.getAccessToken();
      if (!token) return null;
      try {
        const response = await AuthApiService.getUser();
        return response.data;
      } catch (error) {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}


export const useLoginMutation = () => {

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await AuthApiService.login(credentials);

      const tokens: AuthTokens = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      }
      await StorageService.setTokens(tokens);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser })
    }
  })
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (userData: RegisterRequest) => {
      const response = await AuthApiService.register(userData);
      return response;
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await AuthApiService.logout();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};