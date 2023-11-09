import { Document } from "mongoose";
import { User } from "../user/UserDomain";
import { UserDto } from "../user/dto/UserDto";

export interface IDatabaseUser {
  add(user: Omit<User, "id">): Promise<Document<any> | Error>;
  remove(id: string): Promise<any | Error>;
  updateById(id: string, newData: UserDto): Promise<string | Error>;
  findAll(): Promise<any | Error>;
  findByIdOrEmail(id?: string, email?: string): Promise<any | Error>;
}
