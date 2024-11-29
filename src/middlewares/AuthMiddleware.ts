import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IGetUserAuthInfoRequest } from '../types/interface';

class AuthMiddleware {
  static authenticateUser(req: Request, res: Response, next: NextFunction): any {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming "Bearer token"

    if (!token) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    try {
      // Verify token (replace 'secret' with your JWT secret key)
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

      // Attach the userId to the request object
      req.userId = decoded.id;

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  }
}

export default AuthMiddleware;
