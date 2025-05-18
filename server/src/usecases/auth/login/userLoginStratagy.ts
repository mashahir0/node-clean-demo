import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./loginStrategy.interface";
import { IUserRepository } from "entity/repositoryInterfaces/IUser-repository.interface";
import { IBcrypt } from "frameworks/security/bcrypt.tnterface";
import { IUserEntity } from "entity/models/IUser.entitly";
import { LoginUserDto } from "shared/dtos/userDto";

@injectable()
export class UserLoginStrategy implements ILoginStrategy{
    constructor(
        @inject("IUserRepository") private userRepoisory : IUserRepository,
        @inject("IPasswordBcrypt") private passwordBcrypt : IBcrypt
    ){}
    async login(user: LoginUserDto): Promise<Partial<IUserEntity>> {
        const client = await this.userRepoisory.findByEmail(user.email)
        if(!client) throw new Error("user not found")
        if(client.password){
            const isPassMatch = await this.passwordBcrypt.compare(
                user.password,
                client.password
            )
            if(!isPassMatch) throw new Error("incorrect password")
        }
    return client

    }
}