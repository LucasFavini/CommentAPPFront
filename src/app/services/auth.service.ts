import { Injectable } from '@angular/core';
import { CommentService } from './comment-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private commentService: CommentService) { }

  // public addUser(){
  //   const obj = {
  //     name: "front",
  //     lastName: "end",
  //     userCreation: "2024-01-24T16:56:04.726Z"
  //   }
  //   this.http.post(`${this.url}/AddUser`,obj)
  // }

  public login(){
    const obj = {
      userName:"",
      password:"",
    }
    this.commentService.loginMethod(obj).subscribe()
  }

  public storeToken(token: string): void {
    sessionStorage.setItem('token',token);
  }

  public getToken() {
    return sessionStorage.getItem('token');
  }

  public isLoggedIn(): boolean{
    return !!sessionStorage.getItem('token');
  }

}
