import {IUserEntity} from '../models/IUser.entitly' 

export interface IUserRepository{
    create(user:Omit<IUserEntity , "id">): Promise<IUserEntity> ;
    findByEmail(email : string) : Promise<IUserEntity | null>;
    // findById(id:string) : Promise<IUserEntity |  null>;
    // findAll():Promise<IUserEntity[]>;
    // update(id:string , data:Partial<IUserEntity>) :Promise<IUserEntity | null>;
    // delete(id: string) : Promise<boolean>
}