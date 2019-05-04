import { AccountService } from "./../../services/account.service";
import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  private fullname: string = sessionStorage.getItem("fullname");
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private accountService: AccountService
  ) {
    this.retrieveFullName();
  }

  ngOnInit() {}

  retrieveFullName() {
    if (!this.fullname) {
      let username = sessionStorage.getItem("username");
      this.userService.getUserInfoByUsername(username).subscribe((res: any) => {
        this.fullname = res[0].firstname + " " + res[0].lastname;
        sessionStorage.setItem("fullname", this.fullname);
      });
    }
  }
  logoutAction() {
    let accountNo = JSON.parse(sessionStorage.getItem("accountInfo")).accountNo;
    this.accountService.updateLastActiveStatus(accountNo).subscribe(res => {});
    this.authService.logoutSession();
    this.router.navigate(["login"]);
  }
}
