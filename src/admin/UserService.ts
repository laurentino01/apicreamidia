import { IDatabaseUser } from "../interfaces/IDatabaseUser";
import { User } from "./UserDomain";
import { UserDto } from "./dto/UserDto";

export class UserService implements IDatabaseUser {
  constructor(private db: IDatabaseUser, private user?: User) {}

  async add() {
    const res = this.db.add(this.user);

    return res;
  }

  async remove(id: string): Promise<string> {
    const res = this.db.remove(id);

    return res;
  }

  async update(id: string, newData: UserDto): Promise<string> {
    const res = this.db.update(id, newData);

    return res;
  }

  async viewAll(): Promise<any> {
    return this.db.viewAll();
  }

  async viewOne(id: string): Promise<any> {
    return this.db.viewOne(id);
  }
}
