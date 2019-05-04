import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private baseUrl: string = "http://localhost:8081/bankingapp/api/account";
  constructor(private http: HttpClient) {}

  retrieveAccountInfoByUsername(username) {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("x-auth-token", sessionStorage.getItem("auth-token"));
    return this.http.get(this.baseUrl + `/getaccountdetailsbyusername/${username}`, {
      headers
    });
  }

  createNewAccount(newAccount){
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("x-auth-token", sessionStorage.getItem("auth-token"));
    return this.http.post(this.baseUrl + '/createnewaccount', JSON.stringify(newAccount), {headers});
  }

  updateLastActiveStatus(accountNo){
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("x-auth-token", sessionStorage.getItem("auth-token"));
    return this.http.get(this.baseUrl + `/lastactivated/${accountNo}`, {headers});
  }
}
