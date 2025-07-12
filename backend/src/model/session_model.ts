import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();
dotenv.config();

const REFRESH_SECRET = process.env.REFRESH_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

export class SessionModel {
    static async create(userId: number) {
        try {
            return await prisma.session.create({
                data: {
                    userId: Number(userId),
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
        } catch (error) {
            console.error("Hata tespit edildi", error)
        }
    }

    static async get(userId: number) {
        try {
            return await prisma.session.findFirst({
                where: {
                    userId,
                    revokedAt: null,
                },
            });
        } catch (error) {
            console.error("Hata tespit edildi", error)
        }
    }

    static async update(sessionId: number) {
        try {
            return await prisma.session.update({
                where: { id: sessionId },
                data: { revokedAt: new Date() },
            });
        } catch (error) {
            console.error("Hata tespit edildi", error)
        }
    }

    static async refreshToken(token: string) {
        try {
            const decoded = jwt.verify(token, String(REFRESH_SECRET)) as JwtPayload;
            console.log(decoded)
            const { sessionId, userId } = decoded;
            console.log(sessionId)
            // 2. Session Kontrol
            const session = await prisma.session.findUnique({
                where: { id: sessionId },
            });

            if (!session) throw new Error("Oturum bulunamadı");
            if (session.revokedAt) throw new Error("Oturum iptal edilmiş");
            if (session.expiresAt < new Date()) throw new Error("Oturum süresi dolmuş");

            const newAccessToken = jwt.sign(
                { userId },
                String(JWT_SECRET),
                { expiresIn: "15m" }
            );

            const newRefreshToken = jwt.sign(
                { sessionId, userId },
                String(REFRESH_SECRET),
                { expiresIn: "7d" }
            );

            await prisma.session.update({
                where: { id: sessionId },
                data: {
                    expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 7 gün
                    updatedAt: new Date(),
                },
            });

            return { newAccessToken, newRefreshToken };
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Bilinmeyen hata");
        }
    }
}