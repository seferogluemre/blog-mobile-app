import { PrismaClient } from "@prisma/client";
import { POST_WHERE_CLAUSE } from "src/constants/post_constant";
import { CreatePostBody, PostQueryProps, UpdatePostBody, WhereConditionProps } from "src/types/post_types";

const prisma = new PrismaClient();

export class PostModel {

    static async getAll(query: PostQueryProps) {
        const whereConditions = POST_WHERE_CLAUSE(query);

        const posts = await prisma.post.findMany({
            where: whereConditions,
            select: {
                id: true,
                title: true,
                content: true,
                category_id: true,
                created_at: true,
                published_at: true,
                post_tags: true,
                post_comments: true,
                User: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                        username: true,
                    }
                }
            }
        });

        return posts;
    }

    static async getById(id: number) {
        if (!id) {
            return { message: "Boş Id alanı lütfen bir id giriniz" };
        }

        return await prisma.post.findUnique({
            where: {
                id: id,
                deleted_at: null
            },
            select: {
                id: true,
                title: true,
                content: true,
                category_id: true,
                created_at: true,
                published_at: true,
                User: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                        username: true,
                    }
                },
                post_tags: true,
                post_comments: true,
            }
        });
    }

    static async create(data: CreatePostBody) {
        return await prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                userId: Number(data.user_id),
                category_id: Number(data.category_id),
            },
            select: {
                title: true,
                content: true,
                category_id: true,
                User: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                        username: true,
                    }
                }
            }
        });
    }

    static async update(id: number, data: UpdatePostBody) {
        if (id !== null) {
            return await prisma.post.update({
                where: { id: Number(id) },
                data: {
                    title: data.title,
                    content: data.content,
                    category_id: data.category_id,
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    category_id: true,
                }
            });
        } else {
            return { message: "Boş id alanı gönderilemez lütfen tekrar deneyin" };
        }
    }

    static async delete(id: number) {
        return await prisma.post.update({
            where: { id: Number(id) },
            data: {
                deleted_at: new Date()
            },
            select: {
                id: true
            }
        });
    }
}
