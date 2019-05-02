import { Routes } from "@angular/router";
import { HomeRoutes } from "./components/home/home.router";
import { IndexRoutes } from "./components/index/index.router";
import { NoPageRoutes } from "./components/no-page/no-page.router";

export const routes: Routes = [
  ...HomeRoutes,
  ...IndexRoutes,
  ...NoPageRoutes
];
