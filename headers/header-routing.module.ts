import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { RolesComponent } from '../admin/roles/roles.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'adminpanel', component: AdminComponent,
    children: [{ path: 'roles', component: RolesComponent }]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
