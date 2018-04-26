import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'adminpanel', component: AdminComponent,
    children: [{ path: 'roles', redirectTo: '/roles', pathMatch: 'full'  }]
  },
  { path: 'roles', redirectTo: '/roles', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
