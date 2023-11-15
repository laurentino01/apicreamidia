import { User } from "../user/UserDomain";
import { IDatabaseUser } from "../interfaces/IDatabaseUser";
import { UserDto } from "../user/dto/UserDto";
import { userModel } from "../user/model/userSchema";
import { Document } from "mongoose";

export class MongoRepository implements IDatabaseUser {
  private userModel = userModel;

  async add(user: User): Promise<Document<any> | Error> {
    try {
      const emailExists = await this.userModel.findOne({ email: user.email });

      if (emailExists) {
        return new Error("409");
      }

      const res = await this.userModel.create(user);
      return res;
    } catch (error: any) {
      return new Error(error);
    }
  }

  async remove(id: string): Promise<any | Error> {
    try {
      const idExists = await this.userModel.findById(id);

      if (!idExists) {
        return new Error("404");
      }

      const res = await this.userModel.deleteOne({ _id: id });
      return res;
    } catch (error: any) {
      return new Error(error);
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

  async findByEmail(email: string): Promise<User | Error> {
    try {
      const res = await this.userModel.findOne({ email: email });

      if (!res) {
        return new Error("404");
      }

      return res as User;
    } catch (error: any) {
      return new Error(error);
    }
  }
}
