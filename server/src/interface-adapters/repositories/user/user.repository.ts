import { IUserEntity } from "entity/models/IUser.entitly";
import { IUserRepository } from "entity/repositoryInterfaces/IUser-repository.interface";
import { UserModel } from "frameworks/mongodb/models/user.model";
import { injectable } from "tsyringe";


@injectable()
export class UserRepository implements IUserRepository{
    async findByEmail(email: string): Promise<IUserEntity | null> {
        return await UserModel.findOne({email});
    }

    async create(user: Omit<IUserEntity, "id">): Promise<IUserEntity> {
        const newUser = new UserModel(user)
        return await newUser.save()
    }

}