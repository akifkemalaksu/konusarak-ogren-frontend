import { ResultQuestionModel } from './resultQuestionModel';
export interface ResultExamModel {
  title: string;
  content: string;
  questions: ResultQuestionModel[];
}
