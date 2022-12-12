import { NextFunction, Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import TokenService from "../../utils/TokenService";
import UserService from "./user.service";
import authenticateMiddleware from "../../middlewares/auth.middleware";
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

        //verify user and return the user information
        this.router.post(`${this.path}/verify`, authenticateMiddleware,this.verifyUser);

    }

    private register  = async (req: Request, res: Response, next: NextFunction):Promise<Response|void> =>{
        
        console.log(req.body)
        try {
            const user = req.body;
            const response = await this.userService.register(user);
            res.status(201).json(response);
        } catch (err: any) {
            console.log("----Error:",err.message)
            next(err);
        }
    }

    private login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        console.log(req.body);
        try {
            
            const { email, password } = req.body;
            const response = await this.userService.login(email, password);

            res.status(201).json(response);

        } catch (err:any) {
            next(err);
        }
    }

    private verifyUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        // console.log("Verify user : ", req.body);
        try {
            console.log(req.user);
            res.status(201).json(req.user);
        } catch (err: any)
        {
            next(err)
        }
    }

}

export default UserController;