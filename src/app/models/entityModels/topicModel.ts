import { BaseModel } from "./baseModel";

export interface TopicModel extends BaseModel<number> {
  urlPath: string;
  title: string;
  content: string;
}
