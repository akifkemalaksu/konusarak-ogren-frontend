import { CreateQuestionRequestModel } from './createQuestionRequestModel';
export interface CreateExamRequestModel {
  topicPath: string;
  questions: CreateQuestionRequestModel[]
}
