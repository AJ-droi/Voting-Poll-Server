import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";

class JwtUtil {
  public static generateToken(id: string, role: any): string {
    return jwt.sign({ id, role }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
  }

  public static verifyToken(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }
}

export default JwtUtil;
