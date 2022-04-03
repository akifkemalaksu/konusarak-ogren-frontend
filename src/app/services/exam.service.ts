import { ResultExamModel } from './../models/responseModels/resultExamModel';
import { AnswerQuestionRequestModel } from './../models/requestModels/answerQuestionRequestModel';
import { TakeExamResponseModel } from './../models/responseModels/takeExamResponseModel';
import { ResponseModel } from './../models/responseModels/responseModel';
import { ResponseDataModel } from './../models/responseModels/responseDataModel';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExamResponseModel } from '../models/responseModels/examResponseModel';
import { UserTakeExamResponseModel } from '../models/responseModels/userTakeExamResponseModel';
import { CreateExamRequestModel } from '../models/requestModels/createExamRequestModel';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  method: string = "exams";

  constructor(private http: HttpClient) { }

  getExamsWithTopic(): Observable<ResponseDataModel<ExamResponseModel[]>> {
    let action = "GetExamsWithTopic";
    return this.http.get<ResponseDataModel<ExamResponseModel[]>>(`${environment.apiUrl}${this.method}/${action}`);
  }

  deleteExam(examId: number): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(`${environment.apiUrl}${this.method}/${examId}`);
  }

  userIsTakeExam(id: number, userId: number): Observable<ResponseDataModel<UserTakeExamResponseModel[]>> {
    let action = "UserIsTakeExam";
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", userId);
    return this.http.get<ResponseDataModel<UserTakeExamResponseModel[]>>(`${environment.apiUrl}${this.method}/${action}/${id}`, {
      params: queryParams
    });
  }

  createExam(createExam: CreateExamRequestModel): Observable<ResponseModel> {
    let action = "CreateExam";
    return this.http.post<ResponseModel>(`${environment.apiUrl}${this.method}/${action}`, createExam);
  }

  getTakeExam(id: number): Observable<ResponseDataModel<TakeExamResponseModel>> {
    let action = "GetTakeExam";
    return this.http.get<ResponseDataModel<TakeExamResponseModel>>(`${environment.apiUrl}${this.method}/${action}/${id}`);
  }

  solveExam(examAnswers: AnswerQuestionRequestModel[]) {
    let action = "SolveExam";
    return this.http.post<ResponseModel>(`${environment.apiUrl}${this.method}/${action}`, examAnswers);
  }

  resultExam(id: number, userId: number): Observable<ResponseDataModel<ResultExamModel>> {
    let action = "ResultExam";
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", userId);
    return this.http.get<ResponseDataModel<ResultExamModel>>(`${environment.apiUrl}${this.method}/${action}/${id}`, {
      params: queryParams
    });
  }
}
