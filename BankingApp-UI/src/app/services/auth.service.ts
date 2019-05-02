import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  isAuthenticated(): boolean {
    if (sessionStorage.getItem("username") && sessionStorage.getItem("auth-token")) {
      return true;
    }
    return false;
  }

  loginSession(loginResponse) {
    sessionStorage.setItem("username", loginResponse.body.username);
    sessionStorage.setItem("auth-token", loginResponse.headers.get('x-auth-token'));
  }

  logoutSession() {
    sessionStorage.clear();
  }
}
