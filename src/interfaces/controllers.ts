import {Request, Response, NextFunction} from 'express';

export enum methods {GET, POST, PUT, DELETE};

export interface Controllers
{
    path:string,
    controller(req:Request, res: Response, next: NextFunction | null): any,
    type:methods
}