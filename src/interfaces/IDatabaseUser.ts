import { User } from "../admin/UserDomain";
import { UserDto } from "../admin/dto/UserDto";

export interface IDatabaseUser {
  add(user: Omit<User, "id">): Promise<string | Error>;
  remove(id: string): Promise<string | Error>;
  update(id: string, newData: UserDto): Promise<string | Error>;
  viewAll(): Promise<any | Error>;
  viewOne(id?: string, email?: string): Promise<any | Error>;
}
