import { IUserEntity } from "entity/models/IUser.entitly";
import { LoginUserDto } from "shared/dtos/userDto";


export interface ILoginStrategy{
    login(user : LoginUserDto) :Promise<Partial<IUserEntity>>
}