import { IUserEntity } from "entity/models/IUser.entitly";

export interface IGetAllUsersUseCase{
    execute() :Promise<{users : IUserEntity[] | [], total : number}>
}