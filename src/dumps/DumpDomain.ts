import { v4 as uuid } from "uuid";

export class DumpDomain {
  constructor(
    public dumpUrl?: string,
    public image?: string,
    public highlight?: boolean,
    public readonly _id?: string
  ) {
    if (!_id) {
      this._id = uuid();
    }

    if (!highlight) {
      this.highlight = false;
    }
  }
}
