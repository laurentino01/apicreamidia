import { User } from "../admin/UserDomain";
import { UserDto } from "../admin/dto/UserDto";
import { IDatabaseUser } from "../interfaces/IDatabaseUser";

export class InMemoryDataBase implements IDatabaseUser {
  public inMemoryDataBase: any[] = [];

  async add(user: User): Promise<string> {
    this.inMemoryDataBase.push(user);

    return "usuario criado com sucesso";
  }

  async remove(id: string): Promise<string> {
    const userToRemoveIndex = this.inMemoryDataBase.findIndex(
      (user) => user.id === id
    );

    this.inMemoryDataBase.splice(userToRemoveIndex, 1);

    return "usuario removido com sucesso!";
  }

  async update(id: string, newData: UserDto): Promise<string> {
    const userToUpdateIndex = this.inMemoryDataBase.findIndex(
      (user) => user.id === id
    );

    this.inMemoryDataBase[userToUpdateIndex] = {
      email: newData.email,
      password: newData.password,
    };

    return "usuario alterado com sucesso!";
  }

  async viewAll(): Promise<any> {
    return this.inMemoryDataBase;
  }

  async viewOne(id: string): Promise<any> {
    const userIndex = this.inMemoryDataBase.findIndex((user) => user.id === id);

    return this.inMemoryDataBase[userIndex];
  }
}
