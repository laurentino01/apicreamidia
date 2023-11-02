import mongoose from "mongoose";
import { User } from "../admin/UserDomain";
import { IDatabaseUser } from "../interfaces/IDatabaseUser";
import { UserDto } from "../admin/dto/UserDto";
import { userModel } from "../admin/model/userSchema";

export class MongoRepository implements IDatabaseUser {
  private userModel = userModel;

  async add(user: Omit<User, "id">): Promise<string | Error> {
    try {
      const res = await this.userModel.create(user);
      return "Usuário criado com sucesso!";
    } catch (error) {
      return new Error("erro ao criar usuário!");
    }
  }
  async remove(id: string): Promise<string | Error> {
    try {
      const res = this.userModel.deleteOne({ id });
      return "usuario removido com sucesso!";
    } catch (error) {
      return "Erro ao excluir usuário";
    }
  }

  async update(id: string, newData: UserDto): Promise<string | Error> {
    try {
      const res = await this.userModel.updateOne({ id }, newData);
      return "usuario atualizado com sucesso!";
    } catch (error) {
      return "Erro ao atualizar usuário";
    }
  }

  async viewAll(): Promise<any | Error> {
    try {
      const res = await this.userModel.find({});
      return res;
    } catch (error) {
      return new Error("Erro ao visualizar usuários");
    }
  }

  async viewOne(id: string): Promise<any | Error> {
    try {
      const res = await this.userModel.findById(id);
      return res;
    } catch (error) {
      return new Error("Erro ao mostrar usuários");
    }
  }
}
