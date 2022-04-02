import { ResponseModel } from './responseModel';
export interface ResponseDataModel<T> extends ResponseModel {
  data: T
}
