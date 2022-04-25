import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CustomError from '../errors/';
import {Types} from 'mongoose'; 
interface Payload {
    userId: Types.ObjectId
}

declare module "express-serve-static-core" {
    interface Request {
        user: Payload
    }
}

declare module "express" {
    interface Request {
        user: Payload
    }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomError.UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as Payload;
        req.user = {userId: payload.userId};
        next()
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication valid')
    }


}

export default auth;