import { container } from "tsyringe";
import { DependencyInjection } from ".";
import { AuthController } from "interface-adapters/controllers/auth/authController";
import { UserController } from "interface-adapters/controllers/user/userContollers";


DependencyInjection.registerAll()



export const authController = container.resolve(AuthController)
export const userController = container.resolve(UserController)

