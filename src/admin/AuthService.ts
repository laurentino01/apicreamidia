import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserService } from "./UserService";
import { User } from "./UserDomain";

export class AuthService {
  constructor(private service: UserService) {}

  async login(email: string, password: string) {
    const userList: User[] = await this.service.viewOne(undefined, email);

    if (!userList) {
      return new Error("Não autorizado");
    }

    const user: User | undefined = userList.find((o: any) => o.email);

    if (!user) {
      return new Error("Não autorizado");
    }

    try {
      const passEqual = await bcrypt.compare(password, user.password);

      if (!passEqual) {
        return new Error("Não autorizado");
      }

      const token = jwt.sign(
        user._id as string,
        process.env.JWT_SECRET as string
      );
      return token;
    } catch (error) {
      return new Error("Não autorizado" + error);
    }
  }

  async verifyToken(token: any) {
    if (!token) {
      return new Error("Não autrizado!");
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string);
      console.log(payload);

      return payload;
    } catch (error) {
      return new Error("Não autrizado!" + error);
    }
  }
}

