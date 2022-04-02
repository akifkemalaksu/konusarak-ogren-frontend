import { CreateAnswerRequestModel } from './createAnswerRequestModel';
export interface CreateQuestionRequestModel {
  questionText: string
  answers: CreateAnswerRequestModel[]
}
