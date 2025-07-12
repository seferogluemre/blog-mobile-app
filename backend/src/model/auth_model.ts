import { PrismaClient } from "@prisma/client";
import argon2 from 'argon2';
import { CreateRegisterBody } from "src/types/auth_types";

const prisma = new PrismaClient

export class AuthModel {
    static async register(data: CreateRegisterBody) {
        try {
            const hashedPassword = await argon2.hash(data.password, {
                hashLength: 20,
            })

            return await prisma.user.create({
                data: {
                    name: data.name,
                    username: data.username,
                    hashedPassword: hashedPassword,
                    role: data.role || "member"
                },
                select: {
                    name: true,
                    username: true,
                    role: true,
                }
            })
        } catch (error) {
            console.error("Hata tespit edildi", error)
        }
    }

}



