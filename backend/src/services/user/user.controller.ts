import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import UserService from "./user.service";

class UserController implements Controller {
    public path = "/users";
    public router = Router()
    private userService: UserService;
    
    constructor() {
        this.userService = new UserService();
        this.initializeRoutes();
        
        console.log(typeof this.userService);
        
    }

    initializeRoutes() {
        //register
        this.router.post(`${this.path}/register`, this.register);
        //login
        this.router.post(`${this.path}/login`, this.login);
        
        
        
    }

    private register  = async (req: Request, res: Response, next: NextFunction):Promise<Response|void> =>{
        
        
        try {
            const user = req.body;
            const response = await this.userService.register(user);
            res.status(201).json(response);
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

export default UserController;