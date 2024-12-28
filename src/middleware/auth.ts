import { NextFunction, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorised";
import { ErrorCodes } from "../exceptions/roots";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { prismaClient } from "..";
import { IGetUserAuthInfoRequest } from "../customs/customs";

const authMiddleware = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (!token) {
    return next(new UnauthorizedException("unauthorized", ErrorCodes.UNAUTHORIZED_EXCEPTION));
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    const user = await prismaClient.user.findFirst({
      where: {
        id: payload.userId,
      },
    });
    if (!user) {
      return next(new UnauthorizedException("unauthorized", ErrorCodes.UNAUTHORIZED_EXCEPTION));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedException("unauthorized", ErrorCodes.UNAUTHORIZED_EXCEPTION));
  }
};

export default authMiddleware;