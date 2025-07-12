// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "src/utils/jwtUtil";

const prisma = new PrismaClient();

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) res.status(401).json({ message: "Token gerekli" });

    try {
        const payload: any = verifyToken(String(token));

        const session = await prisma.session.findFirst({
            where: {
                revokedAt: null,
                expiresAt: {
                    gte: new Date(),
                },
            },
        });

        if (!session) res.status(401).json({ message: "Geçersiz veya süresi dolmuş token" });

        req.body.userId = payload.userId;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Yetkisiz erişim" });
    }
};
