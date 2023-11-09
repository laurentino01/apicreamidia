import { v4 as uuid } from "uuid";

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public role: "admin" | "other" = "other",
    public readonly _id?: string
  ) {
    if (_id === undefined) {
      this._id = uuid();
    }
  }
}
