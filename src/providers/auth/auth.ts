import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../model/login-response';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../../model/user-model';
import { ApiControllersUrls, ApiAuthActions, ApiUserActions } from '../../environments/environment';

@Injectable()
export class AuthProvider {

  private accessToken:string;
  
  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  login(userName: string, password: string):Promise<LoginResponse> {
    var data = {
      u: userName,
      p: password
    };
    var $login = this.http.post<LoginResponse>(`${ApiControllersUrls.Auth}${ApiAuthActions.login}`, data);
    return $login.toPromise().then(auth => {
      console.log('Login: ', auth);
      this.accessToken = auth.accessToken;
      // Not allowing other components to access this token. confined the token to auth provider only
      auth.accessToken = "";
      return auth;
    })
  }

  logOut() {
    return this.http.get(`${ApiControllersUrls.Auth}${ApiAuthActions.logout}` ,this.getJwtRequestOption())
  }

  isLoggedIn(): boolean {
    return typeof this.accessToken !== "undefined" && this.accessToken !== "";
  }

  getUser(userId: number){
    return this.http.get<UserModel>(`${ApiControllersUrls.User}${ApiUserActions.getUser}?userId=${userId}`,
    this.getJwtRequestOption());
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

