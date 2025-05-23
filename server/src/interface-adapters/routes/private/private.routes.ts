import { AdminRoutes } from "../admin/admin.routes";
import { BaseRoute } from "../baseRoute";
import { UserRoutes } from "../user/user.route";

export class PrivateRoutes extends BaseRoute{
    constructor(){
        super()
    }
    protected initializeRoutes(): void {
        this.router.use('/_us',new UserRoutes().router),
        this.router.use('/_ad',new AdminRoutes().router)
    }
}