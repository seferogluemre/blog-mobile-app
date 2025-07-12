import argon2 from "argon2";
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthModel } from 'src/model/auth_model';
import { SessionModel } from 'src/model/session_model';
import { UserModel } from 'src/model/user_model';
import { LoginBody } from 'src/types/auth_types';
import { logInfo, logWarn } from 'src/utils/loggerUtil';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

export class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const register = await AuthModel.register(req.body);
            logInfo(`AuthRegister - Oluşturulan Kayıt ${register}`)
            res.status(201).json({ data: register })
        } catch (error) {
            console.error("Hata tespit edildi", error)
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password }: LoginBody = req.body;

            const user = await UserModel.getUser({ username: String(username) });
            if (!user) {
                logWarn(`Login - Kullanıcı bulunamadı: ${username}`);
                res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre" });
                return;
            }

            if (!user || typeof user !== 'object' || !user.hasOwnProperty('hashedPassword') || typeof user.hashedPassword !== 'string') {
                logWarn(`Login - Kullanıcı için hash bulunamadı: ${username}`);
                console.error("Veritabanında kullanıcı için hashlenmiş şifre bulunamadı veya tipi yanlış.", user);
                res.status(500).json({ message: "Sunucu yapılandırma hatası." });
                return;
            }

            let passwordMatchBool = false;
            try {
                passwordMatchBool = await argon2.verify(user.hashedPassword, password);
            } catch (error) {
                logWarn("error - Argon2 doğrulama hatası");
                res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre" });
                return;
            }

            if (!passwordMatchBool) {
                logWarn(`Login - Hatalı şifre denemesi: ${username}`);
                res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre" });
                return;
            }


            const accessToken = jwt.sign(
                { userId: user.id, username: user.username, email: user.email },
                JWT_SECRET as string,
                { expiresIn: "15m" }
            );

            const refreshToken = jwt.sign(
                { userId: user.id },
                REFRESH_SECRET as string,
                { expiresIn: "1d" }
            );

            const session = await SessionModel.create(user.id)

            logInfo(`Login - Başarılı giriş: ${username}`);

            res.json({
                message: "Giriş başarılı",
                accessToken,
                refreshToken
            });
        } catch (error) {
            console.error("Login fonksiyonunda genel hata:", error);
            res.status(500).json({ message: "Sunucuda bir hata oluştu." });
        }
    }

    static async logout(req: Request, res: Response): Promise<void> {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                logWarn(`Login - Refresh token gerekli`);
                res.status(400).json({ message: "Refresh token gerekli" });
            }

            const decoded = jwt.verify(refreshToken, String(REFRESH_SECRET)) as JwtPayload;
            if (!decoded.userId) {
                logWarn(`Login - Geçersiz token`);
                res.status(400).json({ message: "Geçersiz token" });
            }

            const { userId } = decoded;

            const session = await SessionModel.get(userId)

            if (!session) {
                logWarn(`Login - Geçersiz refresh token`);
                res.status(400).json({ message: "Geçersiz refresh token" });
            }

            const updatedSession = await SessionModel.update(Number(session?.id))

            logInfo(`Login - Başarıyla çıkış yapıldı`);
            res.status(200).json({ message: "Başarıyla çıkış yapıldı" });
        } catch (error) {
            res.status(500).json({
                message: "Çıkış yapılırken hata oluştu",
                error: error instanceof Error ? error.message : "Bilinmeyen hata",
            });
        }
    }

    static async me(req: Request, res: Response): Promise<void> {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                logWarn(`Me - Token bulunamadı`);
                res.status(401).json({ message: "Token bulunamadı" });
            }
            const token = authHeader?.split(" ")[1];
            if (!token) {
                logWarn(`Me - Geçersiz token formatı`);
                res.status(401).json({ message: "Geçersiz token formatı" });
            }

            const decoded = jwt.verify(String(token), JWT_SECRET as string) as JwtPayload;
            const { userId } = decoded;

            const user = await UserModel.getUser({ id: userId })
            if (!user) {
                logWarn(`Me - Kullanıcı bulunamadı`);
                res.status(404).json({ message: "Kullanıcı bulunamadı" });
            }
            logWarn(`Me - Kullanıcı :${user}`);
            res.status(200).json({ data: user });
        } catch (error) {
            res.status(500).json({
                message: "Kullanıcı alınırken bir hata oluştu",
                error: error instanceof Error ? error.message : "Bilinmeyen hata",
            });
        }
    }

    static async refresh(req: Request, res: Response): Promise<void> {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                logWarn("Refresh Token - Refresh token gerekli")
                res.status(400).json({ message: "Refresh token gerekli" });
            }

            const { newAccessToken, newRefreshToken } = await SessionModel.refreshToken(refreshToken);

            logInfo("Refresh Token - Token Güncellendi")

            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        } catch (error) {
            console.error("Hata tespit edildi", error)
        }
    }
}