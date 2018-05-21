import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../model/login-response';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthProvider {

  private accessToken:string;
  private readonly JWT_URL = 'http://mydnn.me/DesktopModules/JwtAuth/API/mobile/';
  
  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  login(userName: string, password: string) {
    var data = {
      u: userName,
      p: password
    };
    return this.http.post<LoginResponse>(`${this.JWT_URL}login`, data, this.getJwtRequestOption())
  }

  logOut() {
    return this.http.post(`${this.JWT_URL}logout`, {} ,this.getJwtRequestOption())
  }

  isLoggedIn(): boolean {
    return typeof this.accessToken !== "undefined" && this.accessToken !== "";
  }

  private getJwtRequestOption(): any {
    return {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.accessToken}`),
      withCredentials: false
    }
  }


}

