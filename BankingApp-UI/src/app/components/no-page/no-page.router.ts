import { Route } from "@angular/router";
import { NoPageComponent } from "./no-page.component";

export const NoPageRoutes: Route[] = [
  {
    path: "**",
    component: NoPageComponent
  }
];
