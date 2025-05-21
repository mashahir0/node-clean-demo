import { IUserEntity } from "entity/models/IUser.entitly";
import { IUserRepository } from "entity/repositoryInterfaces/IUser-repository.interface";
import { IGetAllUsersUseCase } from "entity/useCaseInterfases/admin/IGetAllUsersUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllUsersUseCase implements IGetAllUsersUseCase{
    constructor(
        @inject("IUserRepository") private userRepository : IUserRepository
    ){}
    async execute(): Promise<{ users: IUserEntity[] | []; total: number; }> {
        const { users , total } = await this.userRepository.getAllUsers()
        return {users, total }
    }
}