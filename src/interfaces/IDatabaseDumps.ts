import { DumpDomain } from "../dumps/DumpDomain";
import { DumpDto } from "../dumps/dto/DumpDto";

export interface IDatabaseDumps {
  add(dump: Omit<DumpDomain, "id">): Promise<string | Error>;
  removeById(id: string): Promise<string | Error>;
  updateById(id: string, newData: DumpDomain): Promise<string | Error>;
  findAll(): Promise<any | Error>;
  findById(id: string): Promise<any | Error>;
}
