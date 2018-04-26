import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserComponent } from './user.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'register', component: UserComponent,
    children: [{ path: '', component: RegisterComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
