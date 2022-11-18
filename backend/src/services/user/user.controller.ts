import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";

class UserController implements Controller {
    public path = "/users";
    public router = Router()
    
    constructor() {
        
    }

    initializeRoutes() {
        //register
        this.router.post(`${this.path}/register`, this.register);
        //login
        this.router.post(`${this.path}/login`, this.login);
        
    }

    private register = async (req: Request, res: Response, next: NextFunction):Promise<Response|void>=>{
        try {
            


        } catch (err:any) {
            next(err);
        }
    }

    private login = async (req: Request, res: Response, next: NextFunction):Promise<Response|void>=>{
        try {
            


        } catch (err:any) {
            next(err);
        }
    }

}