import { IUserEntity } from "entity/models/IUser.entitly";
import { RegUserDto } from "shared/dtos/userDto";



export interface  IRegister{
    register(user :RegUserDto ) : Promise<IUserEntity | void>
}