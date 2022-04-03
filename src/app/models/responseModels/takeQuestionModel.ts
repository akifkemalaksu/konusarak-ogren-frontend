import { TakeAnswerModel } from './takeAnswerModel';
export interface TakeQuestionModel{
  id:number;
  questionText: string;
  answers:TakeAnswerModel[];
}
