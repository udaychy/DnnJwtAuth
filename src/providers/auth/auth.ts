import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../model/login-response';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { UserModel } from '../../model/user-model';

@Injectable()
export class AuthProvider {

  private accessToken:string;
  // Provided by the JWT AUth handler
  private readonly JWT_API = 'http://mydnn.me/DesktopModules/JwtAuth/API/mobile/';
  // My Custom DNN Web API end point
  private readonly USER_API = 'http://mydnn.me/DesktopModules/DnnWebApi/API/User/';
  
  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  login(userName: string, password: string):Promise<LoginResponse> {
    var data = {
      u: userName,
      p: password
    };
    var $login = this.http.post<LoginResponse>(`${this.JWT_API}login`, data);
    return $login.toPromise().then(auth => {
      console.log('Login: ', auth);
      this.accessToken = auth.accessToken;
      // Not allowing other components to access this token. confined the token to auth provider only
      auth.accessToken = "";
      return auth;
    })
  }

  logOut() {
    return this.http.get(`${this.JWT_API}logout` ,this.getJwtRequestOption())
  }

  isLoggedIn(): boolean {
    return typeof this.accessToken !== "undefined" && this.accessToken !== "";
  }

  getUser(userId: number){
    return this.http.get<UserModel>(`${this.USER_API}GetUser?userId=${userId}`,this.getJwtRequestOption())
  }

  // why i changed the return type to object
  // https://stackoverflow.com/a/46239941
  private getJwtRequestOption(): object {
    console.log('access token', this.accessToken);
    return {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${this.accessToken}`),
      withCredentials: false
    }
  }


}

