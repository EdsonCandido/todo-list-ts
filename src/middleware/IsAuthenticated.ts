import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../config/auth";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  name: string;
  is_admin: number;
  document: string;
}

export default function IsAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new Error("JWT token is missing");

    const [, jwt] = authHeader.split(" ");

    const decoded = verify(jwt, auth.jwt.secret);

    const { sub, name, document, is_admin } = decoded as ITokenPayload;

    req.user = {
      id: sub,
      name,
      is_admin,
      document,
    };

    return next();
  } catch (error) {
    // throw new Error("Invalid JWT token");
    res.status(401).json({ message: "Unauthorized" });
  }
}
