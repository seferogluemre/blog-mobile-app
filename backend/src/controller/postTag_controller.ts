import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreatePostTagDto } from "src/dto/PostTagDto";
import { PostTagModel } from "src/model/postTag_model";
import { logInfo, logWarn } from "src/utils/loggerUtil";

export class PostTagController {
    // Add Post Tag
    static async add(req: Request, res: Response): Promise<void> {
        try {
            const createdPostTag = await PostTagModel.create(req.body);
            logInfo(`createPostTag - Gönderi Etiketi ismi: ${createdPostTag}`);
            res.status(201).json({
                message: "Gönderi etiketi başarıyla oluşturuldu",
                data: createdPostTag,
            });
        } catch (error) {
            res.status(404).json({
                message: "Gönderi etiketi oluşturulurken bir hata oluştu",
                error: (error as Error).message
            });
        }
    }

    // Remove Post Tag (Edit operation)
    static async edit(req: Request, res: Response): Promise<void> {
        try {
            const { postId, tagId } = req.params;
            if (!postId || !tagId) {
                logWarn(`editPostTag - Hatalı gönderi etiket Id'si: ${postId} & ${tagId}`);
                res.status(400).json({
                    message: "Hatalı gönderi veya etiket id'si lütfen tekrar deneyin"
                });
                return;
            }

            const deletedTag = await PostTagModel.delete(Number(postId), Number(tagId));
            logInfo(`editPostTag - Silinen Gönderi Etiketi: ${deletedTag}`);
            res.status(200).json({ message: "Etiket başarıyla silindi" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Etiket silinirken hata oluştu" });
        }
    }
}
