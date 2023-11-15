import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserService } from "../user/UserService";

export class AuthService {
  constructor(private service: UserService) {}

  async login(email: string, password: string) {
    const user = await this.service.findByEmail(email);

    if (user instanceof Error) {
      return new Error("401");
    }

    try {
      const passEqual = await bcrypt.compare(password, user.password);

      if (!passEqual) {
        return new Error("401");
      }

      const payload = {
        _id: user._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET as string);
      return token;
    } catch (error) {
      return new Error("401");
    }
  }

  async verifyToken(token: string) {
    if (!token) {
      return new Error("401");
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string);

      return payload;
    } catch (error) {
      return new Error();
    }
  }
}
