import { inject, injectable } from "tsyringe";
import { IAuthController } from "entity/controllerInterface/auth/IAuthController";
import { IRegister } from "usecases/auth/register/IRegister.interface";
import { LoginUserDto, RegUserDto } from "shared/dtos/userDto";
import { Request, Response } from "express";
import { ILoginUseCase } from "entity/useCaseInterfases/auth/ILogin-useCase.interface";


@injectable()
export class AuthController implements IAuthController{
    constructor(
        @inject("IUserRegister") private registerUseCase : IRegister,
        @inject("ILoginUserUseCase") private loginUseCase : ILoginUseCase
    ){}

    async register(req: Request, res: Response): Promise<void> {
        try {
            const userDto :RegUserDto = req.body;
            await this.registerUseCase.register(userDto)
            res.status(200).json({message : 'user created successfully'})

        } catch (error :any) {
            console.log(error)
            res.status(400).json({ error: error.message || "Registration failed" });
        }
    }
    async login(req: Request, res: Response): Promise<void> {
        try {
            const loginDto : LoginUserDto = req.body
             await this.loginUseCase.exicute(loginDto)
             res.status(200).json({message : 'user logged successfully'})
        } catch (error :any ) {
            console.log(error)
            res.status(400).json({error : error.message || "Login failed"})
        }

    }
}