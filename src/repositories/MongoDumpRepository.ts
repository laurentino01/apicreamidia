import { DumpDomain } from "../dumps/DumpDomain";
import { DumpDto } from "../dumps/dto/DumpDto";
import { dumpModel } from "../dumps/model/dumpModel";
import { IDatabaseDumps } from "../interfaces/IDatabaseDumps";

export class MongoDumpRepository implements IDatabaseDumps {
  private dumpModel = dumpModel;
  constructor() {}

  async add(dump: DumpDomain): Promise<any | Error> {
    try {
      return await this.dumpModel.create(dump);
    } catch (error) {
      return new Error("Erro ao criar");
    }
  }

  async removeById(_id: string): Promise<any | Error> {
    try {
      const existsInData = await this.dumpModel.findById(_id);

      if (!existsInData) {
        return new Error("404");
      }

      const res = await this.dumpModel.deleteOne({ _id });

      return res;
    } catch (error) {
      return new Error("Error remove");
    }
  }

  async findById(_id: string): Promise<any> {
    try {
      const dumpInData = await this.dumpModel.findById(_id);

      if (!dumpInData) {
        return new Error("404");
      }
      return dumpInData;
    } catch (error) {
      return new Error("Erro ao criar");
    }
  }

  async updateById(_id: string, dump: DumpDomain): Promise<any | Error> {
    try {
      return await this.dumpModel.findByIdAndUpdate(_id, dump);
    } catch (error) {
      return new Error("Erro ao criar");
    }
  }

  async findAll(): Promise<any> {
    try {
      return await this.dumpModel.find({});
    } catch (error) {
      return new Error("Erro ao criar");
    }
  }
}
