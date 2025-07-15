import { STORAGE_KEYS } from "@/constants/storage"
import { User } from "@/types/auth"
import { AuthTokens } from "@/types/user"
import AsyncStorage from "@react-native-async-storage/async-storage"


export abstract class StorageService {
    static async getAccessToken(): Promise<string | null> {
        return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    }

    static async setAccessToken(token: string): Promise<void> {
        return await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token as string)
    }

    static async getRefreshToken(): Promise<string | null> {
        return await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    }

    static async setRefreshToken(token: string): Promise<void> {
        return await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token as string)
    }

    static async setTokens(tokens: AuthTokens): Promise<void> {
        await Promise.all([
            this.setAccessToken(tokens.accessToken),
            this.setRefreshToken(tokens.refreshToken),
        ])
    }

    static async getTokens(): Promise<AuthTokens | null> {
        const [accessToken, refreshToken] = await Promise.all([this.getAccessToken(), this.getRefreshToken()])

        if (!accessToken || !refreshToken) {
            return null
        }

        return { accessToken, refreshToken }

    }

    static async setUserData(user: User): Promise<void> {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user))
    }

    static async getUserData(): Promise<User | null> {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
        return data ? JSON.parse(data) : null;
    }

    static async clearAll(): Promise<void> {
        await AsyncStorage.multiRemove([
            STORAGE_KEYS.ACCESS_TOKEN,
            STORAGE_KEYS.REFRESH_TOKEN,
            STORAGE_KEYS.USER_DATA,
        ])
    }
}