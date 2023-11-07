import { DumpDomain } from "../dumps/DumpDomain";
import { DumpDto } from "../dumps/dto/DumpDto";
import { dumpModel } from "../dumps/model/dumpModel";
import { IDatabaseDumps } from "../interfaces/IDatabaseDumps";

export class MongoDumpRepository implements IDatabaseDumps {
  private dumpModel = dumpModel;
  constructor(private dump: DumpDomain) {}

  async add(): Promise<any | Error> {
    try {
      return await this.dumpModel.create(this.dump);
    } catch (error) {
      return new Error("Erro ao criar");
    }
  }

  async removeById(): Promise<any | Error> {
    try {
      return await this.dumpModel.deleteOne({ _id: this.dump._id });
    } catch (error) {
      return new Error("Erro ao criar");
    }
  }

  async findById(): Promise<any> {
    try {
      return await this.dumpModel.findById(this.dump._id);
    } catch (error) {
      return new Error("Erro ao criar");
    }
  }

  async updateById(): Promise<any | Error> {
    try {
      return await this.dumpModel.updateOne({ _id: this.dump._id }, this.dump);
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
