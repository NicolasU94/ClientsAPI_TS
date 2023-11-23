// const jwt = require("jsonwebtoken");
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not Authenticated, No Token detected");
    (error as any).statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let checkToken: any;
  try {
    if (token) {
      checkToken = jwt.verify(token, process.env.SECRET);  
    } else {
      const error = new Error("Token is undefined");
      throw error;
    }
    
  } catch (error) {
    (error as any).statusCode = 500;
    throw error;
  }
  if (!checkToken) {
    const error = new Error("Not Authenticated");
    (error as any).statusCode = 403;
    throw error;
  }
  next();
};

export default auth