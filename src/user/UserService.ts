import { Document } from "mongoose";
import { IDatabaseUser } from "../interfaces/IDatabaseUser";
import { User } from "./UserDomain";
import { UserDto } from "./dto/UserDto";

export class UserService implements IDatabaseUser {
  constructor(private db: IDatabaseUser) {}

  async add(user: User): Promise<Document<any> | Error> {
    const res = await this.db.add(user);
    return res;
  }

  async remove(id: string): Promise<string | Error> {
    const res = await this.db.remove(id);

    return res;
  }

  async updateById(id: string, newData: UserDto): Promise<string | Error> {
    const res = await this.db.updateById(id, newData);

    return res;
  }

  async findAll(): Promise<any | Error> {
    return await this.db.findAll();
  }

  async findByIdOrEmail(id?: string, email?: string): Promise<any | Error> {
    return await this.db.findByIdOrEmail(id, email);
  }

  async findByEmail(email?: string): Promise<User | Error> {
    const res = await this.db.findByEmail(email);
    return res;
  }
}
