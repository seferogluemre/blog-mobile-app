import { PrismaClient } from "@prisma/client";
import { CreateUserBody, UpdateUserBody } from "src/types/user_types";
import argon2 from 'argon2'

const prisma = new PrismaClient();

export class UserModel {
    static async create(data: CreateUserBody) {
        try {
            const hashedPassword = await argon2.hash(data.password, { hashLength: 20, })
            return await prisma.user.create({
                data: {
                    name: data.name,
                    username: data.username,
                    hashedPassword: hashedPassword,
                    role: "member",
                },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    role: true,
                }
            })
        } catch (error) {
            console.error("Hata tespit edildi", error)
        }
    }

    static async update(id: number, data: UpdateUserBody) {
        try {
            if (!id) {
                return { message: "Hatalı Id gönderimi" }
            }
            const hashedPassword = await argon2.hash(String(data.password), { hashLength: 20, })

            return await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    name: data.name,
                    username: data.username,
                    hashedPassword: hashedPassword
                },
                select: {
                    name: true,
                    username: true,
                }
            })
        } catch (error) {
            console.error("Hata tespit edildi", error)
        }
    }

    static async getUser(filter: { id?: number, username?: string }) {
        try {
            const { id, username }: { id: number, username: string } = filter;

            // Parametre kontrolü
            if (!id && !username) {
                return { message: "Hatalı id veya kullanıcı adı" };
            }

            const user = await prisma.user.findFirst({
                where: {
                    ...(id && { id }),
                    ...(username && { username }),
                    deletedAt: null
                },
                select: {
                    name: true,
                    role: true,
                    username: true,
                    hashedPassword: true,
                    createdAt: true,
                    id: true,
                }
            });

            if (!user) {
                return { message: "Kullanıcı bulunamadı veya silinmiş!" };
            }

            return user;
        } catch (error) {
            console.error("Hata tespit edildi", error);
        }
    }


    static async delete(id: number) {
        try {
            if (!id) {
                return { message: "Hatalı id gönderimi" }
            }
            return await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    deletedAt: new Date()
                },
                select: {
                    name: true,
                    role: true,
                    username: true,
                }
            })
        } catch (error) {
            console.error("Hata tespit edildi", error)
        }
    }

    static async getAll() {
        try {
            return await prisma.user.findMany({
                where: {
                    OR: [
                        { deletedAt: null },
                    ]
                },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    role: true,
                    createdAt: true
                }
            })
        } catch (error) {
            console.error("Hata tespit edildi", error)
        }
    }
}

