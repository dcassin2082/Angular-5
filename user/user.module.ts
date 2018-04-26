import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user.component';

import { UserService } from './shared/user.service';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    UserComponent,
    ConfirmEqualValidatorDirective,
    ResetPasswordComponent
  ],
  providers: [UserService]
})
export class UserModule { }
