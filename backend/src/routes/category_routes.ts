import { Router } from "express";
import { CategoryController } from "src/controller/category_controller";
import { CreateCategoryDto, UpdateCategoryDto } from "src/dto/CategoryDto";
import { validateAndCheckParams, validateDto } from "src/middlewares/requestValidationMiddleware";


const router = Router();

router.get('/', CategoryController.list)
router.get('/:id', CategoryController.get)
router.post('/', validateDto(CreateCategoryDto), CategoryController.add)
router.patch('/:id', validateAndCheckParams(UpdateCategoryDto), CategoryController.edit)
router.delete('/:id', CategoryController.remove)


export default router;