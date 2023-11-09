import { User } from "../user/UserDomain";
import { IDatabaseUser } from "../interfaces/IDatabaseUser";
import { UserDto } from "../user/dto/UserDto";
import { userModel } from "../user/model/userSchema";
import { Document } from "mongoose";

export class MongoRepository implements IDatabaseUser {
  private userModel = userModel;

  async add(user: User): Promise<Document<any> | Error> {
    try {
      const res = await this.userModel.create(user);
      return res;
    } catch (error: any) {
      return new Error(error);
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

  async updateById(id: string, newData: UserDto): Promise<string | Error> {
    try {
      const res = await this.userModel.updateOne({ id }, newData);
      return "usuario atualizado com sucesso!";
    } catch (error) {
      return "Erro ao atualizar usuário";
    }
  }

  async findAll(): Promise<any | Error> {
    try {
      const res = await this.userModel.find({});
      return res;
    } catch (error) {
      return new Error("Erro ao visualizar usuários");
    }
  }

  async findByIdOrEmail(id?: string, email?: string): Promise<any | Error> {
    try {
      if (id) {
        const res = await this.userModel.findById(id);
        return res;
      } else {
        const res = await this.userModel.find({ email });
        return res;
      }
    } catch (error) {
      return new Error("Erro ao mostrar usuários");
    }
  }
}
