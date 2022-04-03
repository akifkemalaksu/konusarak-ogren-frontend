import { TopicModel } from './../models/entityModels/topicModel';
import { TopicFromWebResponseModel } from './../models/responseModels/topicFromWebResponseModel';
import { environment } from './../../environments/environment';
import { Observable, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDataModel } from '../models/responseModels/responseDataModel';
import { CreateExamRequestModel } from '../models/requestModels/createExamRequestModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  method = "topics";
  constructor(private http: HttpClient) { }

  getMostRecentTopics(): Observable<ResponseDataModel<TopicFromWebResponseModel[]>> {
    let action = "GetMostTopics";
    return this.http.get<ResponseDataModel<TopicFromWebResponseModel[]>>(`${environment.apiUrl}${this.method}/${action}`);
  }

  getTopicFromPath(path: string): Observable<ResponseDataModel<TopicModel>> {
    let action = "GetTopicFromWeb";
    return this.http.get<ResponseDataModel<TopicModel>>(`${environment.apiUrl}${this.method}/${action}/${path}`);
  }
}
