import { TakeQuestionModel } from './takeQuestionModel';
export interface TakeExamResponseModel {
  title: string;
  content: string;
  questions: TakeQuestionModel[];
}
