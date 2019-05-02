import { AccountService } from "./../../../services/account.service";
import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: "app-accounthome",
  templateUrl: "./accounthome.component.html",
  styleUrls: ["./accounthome.component.css"]
})
export class AccounthomeComponent implements OnInit {
  private isAccountExist: boolean;
  private closingBalance: string = "500";
  fullname = sessionStorage.getItem("fullname");
  lastActive = '';

  constructor(private accountService: AccountService, private router:Router) {
    this.retrieveAccountInfo();
    if(sessionStorage.getItem('accountInfo')){
      this.lastActive = new String(JSON.parse(sessionStorage.getItem('accountInfo')).lastActive).split('T')[0];
    }
  }

  ngOnInit() {}

  retrieveAccountInfo() {
    let username = sessionStorage.getItem("username");
    this.accountService.retrieveAccountInfoByUsername(username).subscribe(
      (res: any) => {
        this.closingBalance = res.accountDetails.closingBalance;
        sessionStorage.setItem("accountInfo", JSON.stringify(res.accountDetails));
        this.isAccountExist = true;
      },
      (httpErr: HttpErrorResponse) => {
        if (httpErr.status === 400 && httpErr.error.messageCode === "ACCRE") {
          this.isAccountExist = false;
        }
      }
    );
  }

  createNewAccount() {
    if (!this.isAccountExist) {
      let accountData = {
        username: sessionStorage.getItem("username"),
        closingBalance: this.closingBalance
      };
      this.accountService
        .createNewAccount(accountData)
        .subscribe((res: any) => {
          this.isAccountExist = true;
          this.router.navigate(['']);
        });
    }
  }
}
