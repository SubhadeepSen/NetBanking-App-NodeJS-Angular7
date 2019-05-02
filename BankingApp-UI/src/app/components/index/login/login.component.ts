import { UserService } from "./../../../services/user.service";
import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginData = {
    username: "",
    password: ""
  };
  errorMsg = "";
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  loginAction() {
    this.userService.login(this.loginData).subscribe(
      loginResponse => {
        this.errorMsg = "";
        this.authService.loginSession(loginResponse);
        this.router.navigate([""]);
      },
      (httpErr: HttpErrorResponse) => {
        if (httpErr.status === 400) {
          this.errorMsg = httpErr.error.message;
        }
      }
    );
  }
}
