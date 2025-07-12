
import { PrismaClient } from "@prisma/client";
import { CreateTagBody, UpdateTagBody } from "src/types/tag_types";

const prisma = new PrismaClient();

export class TagModel {
    static async getAll() {
        return await prisma.tag.findMany({
            select: {
                id: true,
                name: true,
                post_tags: true
            }
        });
    }

    static async get(id: number) {
        if (!id) {
            throw new Error("Boş Id alanı lütfen bir id giriniz");
        }
        return await prisma.tag.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                post_tags: true
            }
        });
    }

    static async create(data: CreateTagBody) {
        return await prisma.tag.create({
            data: {
                name: data.name,
            },
            select: {
                id: true,
                name: true,
                post_tags: true
            }
        });
    }

    static async update(id: number, data: UpdateTagBody) {
        if (!id) {
            throw new Error("Boş id alanı gönderilemez lütfen tekrar deneyin");
        }
        return await prisma.tag.update({
            where: { id },
            data: {
                name: data.name
            },
            select: {
                id: true,
                name: true,
                post_tags: true
            }
        });
    }

    static async delete(id: number) {
        return await prisma.tag.delete({
            where: { id },
            select: {
                id: true
            }
        });
    }
}
