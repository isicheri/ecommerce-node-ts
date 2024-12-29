import { NextFunction, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorised";
import { ErrorCodes } from "../exceptions/roots";

import { IGetUserAuthInfoRequest } from "../customs/customs";

const adminMiddleware = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
 const user = req.user;
 user?.role === "ADMIN"?  next() : next(new UnauthorizedException("cant perform request ",ErrorCodes.UNAUTHORIZED_EXCEPTION))
};

export default adminMiddleware;