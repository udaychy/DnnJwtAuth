import {ApiHostName, NoImageUrl} from '../environments/environment'
export class UserModel {
  UserId: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  DisplayName: string;
  Roles: string;

  private _photo: string;
  get Photo():string{
    return this._photo;
  }
  set Photo(relativePath:string){
    this._photo = relativePath ? `${ApiHostName}${relativePath}` : NoImageUrl;
  }

  constructor(user? :UserModel) {
    if(!user) return;

    this.UserId= user.UserId;
    this.UserName= user.UserName;
    this.FirstName= user.FirstName;
    this.LastName= user.LastName;
    this.Email= user.Email;
    this.DisplayName= user.DisplayName;
    this.Roles= user.Roles;
    this.Photo = user.Photo
  }
}