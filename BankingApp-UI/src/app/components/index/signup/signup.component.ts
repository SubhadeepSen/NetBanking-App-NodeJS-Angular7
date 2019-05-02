import { UserService } from "./../../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signupData = {
    firstname: "",
    lastname: "",
    emailId: "",
    dateOfBirth: "",
    username: "",
    password: "",
    phoneNo: "",
    address: {
      firstline: "",
      secondline: "",
      city: "",
      country: "",
      pin: ""
    }
  };

  errorMsg = "";
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  signupAction() {
    this.userService.register(this.signupData).subscribe(
      (signupResult: Signup) => {
        alert(signupResult.message);
        this.errorMsg = "";
        this.router.navigate(["login"]);
      },
      (httpErr: HttpErrorResponse) => {
        if (httpErr.status === 400) {
          this.errorMsg = httpErr.error.message;
        }
      }
    );
  }
}

class Signup {
  message;
  messageCode;
  username;
  constructor() {}
}
