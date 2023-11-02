import { v4 as uuid } from "uuid";
import { DumpDomain } from "../dumps/DumpDomain";
import { ToolBox } from "./ToolBox";

export class User {
  public toolBox: ToolBox;

  constructor(
    public email: string,
    public password: string,
    public readonly _id?: string
  ) {
    if (_id === undefined) {
      this._id = uuid();
    }
    const dumps = new DumpDomain();
    this.toolBox = new ToolBox(dumps);
  }
}
