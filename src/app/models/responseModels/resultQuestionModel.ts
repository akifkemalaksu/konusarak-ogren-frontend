import { ResultAnswerModel } from './resultAnswerModel';
export interface ResultQuestionModel {
  id: number;
  answerId: number;
  questionText: string;
  answers: ResultAnswerModel[];
}
