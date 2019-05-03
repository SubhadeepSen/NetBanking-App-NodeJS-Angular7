import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl:string = 'http://localhost:8081/bankingapp/api/user';
  constructor(private http: HttpClient) { }

  register(signupData){
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    return this.http.post(this.baseUrl + '/register', JSON.stringify(signupData), {headers});
  }

  login(loginData):Observable<HttpResponse<Object>>{
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    return this.http.post<HttpResponse<Object>>(this.baseUrl + '/validateuser', JSON.stringify(loginData), {headers, observe: 'response'});
  }

  getUserInfoByUsername(username){
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("x-auth-token", sessionStorage.getItem('auth-token'));
    return this.http.get(this.baseUrl + `/getuserbyusername/${username}`, {headers});
  }

  changePassword(forgotPasswordData){
    let headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");
  return this.http.post(this.baseUrl + '/updatepassword', JSON.stringify(forgotPasswordData), {headers});
  }
}
