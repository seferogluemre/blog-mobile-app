import { Router } from "express";
import { AuthController } from "src/controller/auth_controller";
import { CreateRegisterDto } from "src/dto/AuthDto";
import { validateDto } from "src/middlewares/requestValidationMiddleware";

const router = Router()

router.post('/register', validateDto(CreateRegisterDto), AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/me', AuthController.me)
router.post('/refresh', AuthController.refresh)


export default router;