import { IDatabaseDumps } from "../interfaces/IDatabaseDumps";
import { DumpDomain } from "./DumpDomain";

export class DumpService implements IDatabaseDumps {
  constructor(private dump: DumpDomain, private db: IDatabaseDumps) {}

  async add(): Promise<string | Error> {
    return await this.db.add(this.dump);
  }

  async findAll(): Promise<any> {
    return await this.db.findAll();
  }

  async findById(): Promise<any> {
    return await this.db.findById(this.dump._id as string);
  }

  async removeById(): Promise<string | Error> {
    return await this.db.removeById(this.dump._id as string);
  }

  async updateById(_id: string): Promise<string | Error> {
    return await this.db.updateById(_id, this.dump);
  }
}
