import { IUserEntity } from "entity/models/IUser.entitly";
import { LoginUserDto } from "shared/dtos/userDto";

export interface ILoginUseCase{
    exicute(user:LoginUserDto) : Promise<Partial<IUserEntity>>
}