import { HttpErrorResponse } from "@angular/common/http";
import { UserService } from "./../../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordData = {
    emailId: "",
    dateOfBirth: "",
    username: "",
    password: ""
  };
  errorMsg = "";
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  forgotPasswordAction() {
    this.userService.changePassword(this.forgotPasswordData).subscribe(
      res => {
        alert("Your password has been changed.");
        this.errorMsg = "";
        this.router.navigate(["login"]);
      },
      (httpErr: HttpErrorResponse) => {
        console.log(httpErr);
        if (httpErr.status === 400 || httpErr.status === 404) {
          this.errorMsg = httpErr.error.message;
        }
      }
    );
  }
}
