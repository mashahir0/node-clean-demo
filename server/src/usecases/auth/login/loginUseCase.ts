import { ILoginUseCase } from "entity/useCaseInterfases/auth/ILogin-useCase.interface";
import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./loginStrategy.interface";
import { IUserEntity } from "entity/models/IUser.entitly";
import { LoginUserDto } from "shared/dtos/userDto";

@injectable()
export class LoginUseCase implements ILoginUseCase{
    private strategies :Record<string , ILoginStrategy>
    constructor(
        @inject("UserLoginStrategy") private userLoginStrategy :ILoginStrategy,
        @inject("AdminLoginStrategy") private adminLoginStrategy : ILoginStrategy
    ){
        this.strategies = {
            user: userLoginStrategy,
            admin : adminLoginStrategy
        }
    }

    async exicute(user: LoginUserDto): Promise<Partial<IUserEntity>> {
        const strategy  =  this.strategies[user.role]
        if(!strategy) throw new Error("invalid")
        return await strategy.login(user)
    }
}