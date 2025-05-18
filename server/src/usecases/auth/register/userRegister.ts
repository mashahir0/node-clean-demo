import { inject, injectable } from "tsyringe";
import { IRegister } from "./IRegister.interface";
import { IUserRepository } from "entity/repositoryInterfaces/IUser-repository.interface";
import { IUserEntity } from "entity/models/IUser.entitly";
import { RegUserDto } from "shared/dtos/userDto";
import { IBcrypt } from "frameworks/security/bcrypt.tnterface";

@injectable()
export class UserRegisterUseCase implements IRegister {
    constructor(
        @inject("IUserRepository") private userRepository : IUserRepository,
        @inject("IPasswordBcrypt") private passwordBcrypt : IBcrypt
    ){}

    async register(user: RegUserDto): Promise<IUserEntity | void> {
        const existingUser = await this.userRepository.findByEmail(user.email)
        if(existingUser) throw new Error("Email already exists")
        
        const hashedPassword =  await this.passwordBcrypt.hash(user.password)
        const newUser = await this.userRepository.create({
            ...user,
            password : hashedPassword,
            role : user.role || "user"
        }) 
        return newUser
    }
}