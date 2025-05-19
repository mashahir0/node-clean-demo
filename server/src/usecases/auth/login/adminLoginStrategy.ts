import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./loginStrategy.interface";
import { IUserRepository } from "entity/repositoryInterfaces/IUser-repository.interface";
import { IBcrypt } from "frameworks/security/bcrypt.tnterface";
import { IUserEntity } from "entity/models/IUser.entitly";
import { LoginUserDto } from "shared/dtos/userDto";


@injectable()
export class AdminLoginstrategy implements ILoginStrategy{
    constructor(
        @inject("IUserRepository") private userRepository : IUserRepository,
        @inject("IPasswordBcrypt") private passwordBcrypt : IBcrypt
    ){}
    async login(user: LoginUserDto): Promise<Partial<IUserEntity>> {
        console.log('admin strategy')
        const admin = await this.userRepository.findByEmail(user.email)
        if(!admin) throw new Error("admin not found")
        if(admin.role !== "admin") throw new Error("invalid Role")
        if(admin.password){
            const isPassMatch = await this.passwordBcrypt.compare(
                user.password,
                admin.password
            )
            if(!isPassMatch) throw new Error("invalid password")
        }
    return admin
    }
}