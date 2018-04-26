import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CustomersComponent } from './customers/customers.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProductsComponent } from './products/products.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { PageNotFoundComponent } from './not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user.component';
import { ResetPasswordComponent } from './user/resetpassword/resetpassword.component';
import { RolesComponent } from './admin/roles/roles.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard]},
  // { path: 'adminpanel', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin']}},
  { path: 'adminpanel', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'roles', component: RolesComponent },
  // { path: 'roles', component: RolesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: '**', component:PageNotFoundComponent }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
