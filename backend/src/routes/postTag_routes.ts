import { Router } from "express";
import { PostTagController } from "src/controller/postTag_controller";
import { CreatePostTagDto } from "src/dto/PostTagDto";
import { validateDto } from "src/middlewares/requestValidationMiddleware";

const router = Router()

router.post('/:id/tags', validateDto(CreatePostTagDto), PostTagController.add)
router.delete("/:postId/tags/:tagId", PostTagController.edit);

export default router;