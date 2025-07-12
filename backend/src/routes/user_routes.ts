import { Router } from "express";
import { UserController } from "src/controller/user_controller";
import { CreateUserDto, UpdateUserDto } from "src/dto/UserDto";
import { validateAndCheckParams, validateDto } from "src/middlewares/requestValidationMiddleware";

const router = Router();

router.post('/', validateDto(CreateUserDto), UserController.add)
router.patch('/:id', validateAndCheckParams(UpdateUserDto), UserController.edit)
router.get('/:id', UserController.get)
router.delete('/:id', UserController.remove)
router.get('/', UserController.list)


export default router;