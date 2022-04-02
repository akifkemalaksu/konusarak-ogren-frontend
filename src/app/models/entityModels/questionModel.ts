import { BaseModel } from './baseModel';
export interface QuestionModel extends BaseModel<number> {
  topicId: number;
  questionText: string;
}
