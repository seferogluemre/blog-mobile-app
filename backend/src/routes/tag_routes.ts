import { Router } from "express";
import { TagController } from "src/controller/tag_controller";
import { CreateTagDto, UpdateTagDto } from "src/dto/TagDto";
import { validateAndCheckParams, validateDto } from "src/middlewares/requestValidationMiddleware";

const router = Router();

router.get('/', TagController.list)
router.get('/:id', TagController.get)
router.post('/', validateDto(CreateTagDto), TagController.add)
router.patch('/:id', validateAndCheckParams(UpdateTagDto), TagController.edit)
router.delete('/:id', TagController.remove)


export default router;
