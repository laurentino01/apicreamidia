import { v4 as uuid } from "uuid";
import { DumpDomain } from "../dumps/DumpDomain";

export class User {
  constructor(
    public email: string,
    public password: string,
    public readonly _id?: string
  ) {
    if (_id === undefined) {
      this._id = uuid();
    }
  }
}
