import { v4 as uuid } from "uuid";

export class DumpDomain {
  constructor(
    public dumpUrl?: string,
    public image?: string,
    public readonly id?: string
  ) {
    if (!id) {
      this.id = uuid();
    }
  }
}
