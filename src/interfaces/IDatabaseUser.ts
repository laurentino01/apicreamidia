import { User } from "../admin/UserDomain";
import { UserDto } from "../admin/dto/UserDto";

export interface IDatabaseUser {
  add(user: Omit<User, "id">): Promise<string>;
  remove(id: string): Promise<string>;
  update(id: string, newData: UserDto): Promise<string>;
  viewAll(): Promise<any>;
  viewOne(id: string): Promise<any>;
}
