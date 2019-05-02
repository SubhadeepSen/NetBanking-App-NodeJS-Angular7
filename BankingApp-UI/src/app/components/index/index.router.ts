import { LoginGuard } from './../../guards/login.guard';
import { IndexComponent } from "./index.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { Route } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";

export const IndexRoutes: Route[] = [
  {
    path: "",
    component: IndexComponent,
    canActivate: [LoginGuard],
    children: [
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "forgot", component: ForgotPasswordComponent }
    ]
  }
];
