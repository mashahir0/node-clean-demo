import { inject, injectable } from "tsyringe";
import { IAuthController } from "entity/controllerInterface/auth/IAuthController";
import { IRegister } from "usecases/auth/register/IRegister.interface";
import { LoginUserDto, RegUserDto } from "shared/dtos/userDto";
import { Request, Response } from "express";
import { ILoginUseCase } from "entity/useCaseInterfases/auth/ILogin-useCase.interface";
import { IRefreshTokenUseCase } from "entity/useCaseInterfases/auth/IRefreshTokenUseCase";
import { IGenerateTokenUseCase } from "entity/useCaseInterfases/auth/IGenerateToken-useCase";
import { clearAuthCookies, setAuthCookies, updateCookieWithAccessToken } from "shared/utils/cookieHelpe";
import { CustomRequest } from "interface-adapters/middleWare/authMiddleWare";


@injectable()
export class AuthController implements IAuthController{
    constructor(
        @inject("IUserRegister") private registerUseCase : IRegister,
        @inject("ILoginUserUseCase") private loginUseCase : ILoginUseCase,
        @inject("IRefreshTokenUseCase") private refreshTokenUseCase : IRefreshTokenUseCase,
        @inject("IGenerateTokenUseCase") private generateTokenUseCase : IGenerateTokenUseCase
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
             const user =  await  this.loginUseCase.exicute(loginDto)
             if (!user.id || !user.email || !user.role) {
                 throw new Error("User ID,Email, or role is missing");
             }
             const tokens = await this.generateTokenUseCase.execute(
                user.id,
                user.email,
                user.role
             )

             const accessTokenName = `${user.role}_access_token`
             const refreshTokenName = `${user.role}_refresh_token`

             setAuthCookies(
                res,
                tokens.accessToken,
                tokens.refreshToken,
                accessTokenName,
                refreshTokenName
             )
             res.status(200).json({
                success : true,
                message : 'login successfull',
                user:{
                    id : user.id,
                    name: user.name,
                    email : user.email
                }
             })
        } catch (error :any ) {
            console.log(error)
            res.status(400).json({error : error.message || "Login failed"})
        }
    }
    async refreshToken(req: Request, res: Response):Promise<void> {
        try {
            const refreshToken = (req as CustomRequest).user.refresh_token
        const newTokens = this.refreshTokenUseCase.execute(refreshToken)
        const accessTokenName = `${newTokens.role}_access_token`
        updateCookieWithAccessToken(res , newTokens.accessToken,accessTokenName)
        res.status(200).json({success : true ,message : "new accessoTken created successfully"})
        } catch (error) {
            console.log(`${(req as CustomRequest).user.role}`)
            clearAuthCookies(
                res,
                `${(req as CustomRequest).user.role}_access_token`,
                `${(req as CustomRequest).user.role}_refresh_token`
            );
            res.status(400).json({message : "failed to create new accessToken"})
            console.log(error)
        }
    }
}