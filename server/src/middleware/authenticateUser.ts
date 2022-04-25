import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CustomError from '../errors/';

declare module "express-serve-static-core" {
    interface Request {
        user: string | JwtPayload
    }
}

declare module "express" {
    interface Request {
        user: string | JwtPayload
    }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomError.UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = payload;
        next()
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication valid')
    }


}

export default auth;