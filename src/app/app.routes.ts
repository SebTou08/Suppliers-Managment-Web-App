import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {canActivate} from "@angular/fire/auth-guard";
import {authGuard, publicGuard} from "./core/guards";


export const routes: Routes = [
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [publicGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
