import { useCurrentUser, useLoginMutation, useLogoutMutation, useRegisterMutation } from "@/services/queries/authQueries";
import { LoginRequest, RegisterRequest } from "@/types/auth";


export const useAuth = () => {
    const { data: user, isLoading: isLoadingUser, error: userError } = useCurrentUser();
    const loginMutation = useLoginMutation();
    const registerMutation = useRegisterMutation();
    const logoutMutation = useLogoutMutation();

    const login = async (credentials: LoginRequest) => {
        try {
            await loginMutation.mutateAsync(credentials);
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed',
            };
        }
    };

    const register = async (userData: RegisterRequest) => {
        try {
            await registerMutation.mutateAsync(userData);
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed',
            };
        }
    };

    const logout = async () => {
        try {
            await logoutMutation.mutateAsync();
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || 'Logout failed',
            };
        }
    };

    return {
        user,
        isAuthenticated: !!user,
        isLoading: isLoadingUser || loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,

        login,
        register,
        logout,

        loginError: loginMutation.error,
        registerError: registerMutation.error,
        logoutError: logoutMutation.error,
    };

}