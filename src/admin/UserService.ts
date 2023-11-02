import { IDatabaseUser } from "../interfaces/IDatabaseUser";
import { User } from "./UserDomain";
import { UserDto } from "./dto/UserDto";

export class UserService implements IDatabaseUser {
  constructor(private db: IDatabaseUser) {}

  async add(user: User): Promise<string | Error> {
    const res = await this.db.add(user);

    return res;
  }

  async remove(id: string): Promise<string | Error> {
    const res = await this.db.remove(id);

    return res;
  }

  async update(id: string, newData: UserDto): Promise<string | Error> {
    const res = await this.db.update(id, newData);

    return res;
  }

  async viewAll(): Promise<any | Error> {
    return await this.db.viewAll();
  }

  async viewOne(id?: string, email?: string): Promise<any | Error> {
    return await this.db.viewOne(id, email);
  }
}
