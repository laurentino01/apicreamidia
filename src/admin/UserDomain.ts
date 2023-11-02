import { v4 as uuid } from "uuid";
import { DumpDomain } from "../dumps/DumpDomain";
import { ToolBox } from "./Toolox";

export class User {
  public toolBox: ToolBox;

  constructor(
    public email: string,
    public password: string,
    public readonly id?: string
  ) {
    if (!id) {
      this.id = uuid();
    }
    const dumps = new DumpDomain();
    this.toolBox = new ToolBox(dumps);
  }
}
