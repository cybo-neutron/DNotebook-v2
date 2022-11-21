import jwt from 'jsonwebtoken';
import { Token } from './../utils/interfaces/token.interface';
import { NextFunction, Request, Response } from "express";
import userModel from "../services/user/user.model";
import HttpException from "../utils/exceptions/http.exception";
import TokenService from "../utils/TokenService";

async function authenticateMiddleware(req: Request, res: Response, next: NextFunction) {
    
// read the header and loook for bearer token
    const bearer = req.headers.authorization;
    if (bearer && bearer.startsWith('Bearer ')) {
        // if found verify the token
        const token = bearer.split(' ')[1];
        const decoded: Token | jwt.JsonWebTokenError = TokenService.verifyToken(token);
        
        if (decoded instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, "Unauthorized token"));
        }
        const user = await userModel.findById(decoded.user_id).select('-password').exec();

        if (!user)
            return next(new HttpException(401, "Unauthorized"));
        
        req.user = user;
        return next();

    } else {
        // if bearer token not found -> authentication failed
        return next(new HttpException(404, "Authorization token not found"));
    }

}

export default authenticateMiddleware;