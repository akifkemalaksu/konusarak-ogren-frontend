import { BaseModel } from "./baseModel";

export interface UserModel extends BaseModel<number> {
  firstName: string;
  lastName: string;
  username: string;
}
