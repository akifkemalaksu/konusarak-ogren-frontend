import { ResponseModel } from './../models/responseModels/responseModel';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { CreateExamRequestModel } from './../models/requestModels/createExamRequestModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  method:string = "exams";

  constructor(private http:HttpClient) { }


}
