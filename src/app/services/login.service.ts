import { UserAddModel } from './../models/requestModels/userAddModel';
import { ResponseDataModel } from './../models/responseModels/responseDataModel';
import { UserModel } from './../models/entityModels/userModel';
import { environment } from './../../environments/environment';
import { UserLoginModel } from './../models/requestModels/userLoginModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  method = "users";
  loginUserStorageName = "loginUser";
  constructor(private http: HttpClient) { }

  login(loginInfo: UserLoginModel): Observable<ResponseDataModel<UserModel>> {
    let action = "login";
    return this.http.post<ResponseDataModel<UserModel>>(`${environment.apiUrl}${this.method}/${action}`, loginInfo);
  }

  register(userAdd: UserAddModel): Observable<ResponseDataModel<UserModel>> {
    return this.http.post<ResponseDataModel<UserModel>>(`${environment.apiUrl}${this.method}`, userAdd);
  }

  setLoginedUser(user: UserModel) {
    let userJsonString = JSON.stringify(user);
    sessionStorage.setItem(this.loginUserStorageName, userJsonString);
  }

  getLoginedUser(): UserModel | any {
    let userLogin = sessionStorage.getItem(this.loginUserStorageName);
    if (userLogin) {
      return JSON.parse(userLogin) as UserModel;
    }
    return null;
  }

  removeLoginedUser() {
    sessionStorage.removeItem(this.loginUserStorageName);
    window.location.reload();
  }
}
