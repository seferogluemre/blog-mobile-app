import { Router } from "express";
import { PostController } from "src/controller/post_controller";
import { CreatePostDto, UpdatePostDto } from "src/dto/PostDto";
import { validateAndCheckParams, validateDto } from "src/middlewares/requestValidationMiddleware";

const router = Router()

router.get('/', PostController.list)
router.get('/:id', PostController.get)
router.post('/', validateDto(CreatePostDto), PostController.add)
router.patch('/:id', validateAndCheckParams(UpdatePostDto), PostController.edit)
router.delete('/:id', PostController.remove)


export default router;