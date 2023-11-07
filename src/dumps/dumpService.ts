import { User } from "../admin/UserDomain";
import { IDatabaseDumps } from "../interfaces/IDatabaseDumps";
import { IDatabaseUser } from "../interfaces/IDatabaseUser";
import { MongoRepository } from "../repositories/MongoRepository";
import { DumpDomain } from "./DumpDomain";
import { DumpDto } from "./dto/DumpDto";

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

  async updateById(): Promise<string | Error> {
    return await this.db.updateById(this.dump._id as string, this.dump);
  }
}
