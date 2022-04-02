import { BaseModel } from './baseModel';
export interface AnswerModel extends BaseModel<number> {
  questionId: number;
  answerText: string;
  isTrue: boolean;
}
