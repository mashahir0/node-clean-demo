import {IUserEntity} from '../models/IUser.entitly' 

export interface IUserRepository{
    create(user:Omit<IUserEntity , "id">): Promise<IUserEntity> ;
    findByEmail(email : string) : Promise<IUserEntity | null>;
    getAllUsers():Promise<{users : IUserEntity[]| [], total : number}>
}