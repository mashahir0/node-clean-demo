import { IUserControllers } from "entity/controllerInterface/user/IUserControllers";
import { IGetAllUsersUseCase } from "entity/useCaseInterfases/admin/IGetAllUsersUseCase";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";


@injectable()
export class UserController implements IUserControllers{
    constructor(
        @inject("IGetAllUsersUseCase") private getUsers : IGetAllUsersUseCase,
        ){}

       async getAllUsers(req: Request, res: Response): Promise<void> {
         try {
            console.log('getall users')
              const {users , total} = await this.getUsers.execute()
           res.status(200).json({success : true , data : {users , total}})
         } catch (error) {
            console.log(error)
            res.status(404).json({error})
         }

       }
}