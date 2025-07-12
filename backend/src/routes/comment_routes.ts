import { Router } from "express";
import { CommentController } from "src/controller/comment_controller";
import { CreateCommentDto, UpdateCommentDto } from "src/dto/CommentDto";
import { validateAndCheckParams, validateDto } from "src/middlewares/requestValidationMiddleware";

const router = Router()

router.get('/', CommentController.list)
router.get('/:id', CommentController.get)
router.post('/', validateDto(CreateCommentDto), CommentController.add)
router.patch('/:id', validateAndCheckParams(UpdateCommentDto), CommentController.edit)
router.delete('/:id', CommentController.remove)

export default router;