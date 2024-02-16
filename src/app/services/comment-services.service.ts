import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  private url = "https://localhost:7141/api"
  userInfo = new BehaviorSubject<any>(null);
  userAndComments = new BehaviorSubject<any>(null);
  filteredComments = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
  }

  public addUser(userAdminId: number, newUser: any):Observable<any>{
    return this.http.post(`${this.url}/Users/AddUser?userAdminId=${userAdminId}`,newUser);
  }

  public getUsersAndComments(): Observable<any>{
    return this.http.get<any>(`${this.url}/Users/GetUsersAndComments`); 
  }

  public loginMethod(user: any): Observable<any> {
    return this.http.post(`${this.url}/Login`, user)
  }

  public addComment(comment: any):Observable<any>{
    return this.http.post(`${this.url}/Comments/AddComment`,comment);
  }

  public addSubComment(subComment: any):Observable<any>{
    return this.http.post(`${this.url}/Comments/AddSubComment`,subComment);
  }

  public deleteComment(userId: number, commentId: number):Observable<any>{
    return this.http.delete(
      `${this.url}/Comments/DeleteComment?userId=${userId}&commentId=${commentId}`);
  }

  public deleteSubComment(commentId: number, userName: string):Observable<any>{
    return this.http.delete(
      `${this.url}/Comments/DeleteSubComment?commentId=${commentId}&userName=${userName}`);
  }

  public storageUserInfo(user: any){
    sessionStorage.setItem('userInfo', JSON.stringify(user));
  }

  public getUserInfo(){
    const userData = sessionStorage.getItem('userInfo');
    let user;
    
    if (userData) {
      try {
        user = JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    return user;
  }

}
