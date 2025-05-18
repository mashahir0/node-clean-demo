import { IUserRepository } from "entity/repositoryInterfaces/IUser-repository.interface";
import { UserRepository } from "interface-adapters/repositories/user/user.repository";
import { container } from "tsyringe";



export class RepositoryRegistry{
    static registerRepositories() : void {
        container.register<IUserRepository>("IUserRepository",{useClass :UserRepository })
    }
}