import { BaseModel } from './baseModel';
export interface UserQuestionAnswer extends BaseModel<number> {
  userId: number;
  questionId: number;
  answerId: number;
}
