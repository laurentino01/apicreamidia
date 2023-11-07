import { IDatabaseDumps } from "../interfaces/IDatabaseDumps";
import { DumpDomain } from "./DumpDomain";

export class DumpService implements IDatabaseDumps {
  constructor(private db: IDatabaseDumps, private dump?: DumpDomain) {}

  async add(): Promise<string | Error> {
    return await this.db.add(this.dump as DumpDomain);
  }

  async findAll(): Promise<any> {
    return await this.db.findAll();
  }

  async findById(_id: string): Promise<any> {
    return await this.db.findById(_id);
  }

  async removeById(_id: string): Promise<string | Error> {
    const dumpInData: DumpDomain = await this.db.findById(_id);
    const res = await this.db.removeById(dumpInData._id as string);
    return res;
  }

  async updateById(_id: string): Promise<string | Error> {
    return await this.db.updateById(_id, this.dump as DumpDomain);
  }
}
