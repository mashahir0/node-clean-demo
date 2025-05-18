import { container } from "tsyringe";
import { DependencyInjection } from ".";
import { AuthController } from "interface-adapters/controllers/auth/authController";


DependencyInjection.registerAll()



export const authController = container.resolve(AuthController)
