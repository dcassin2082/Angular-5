import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  
  constructor(private spinner: NgxSpinnerService, private userService: UserService, private router: Router, private toastrService: ToastrService) { }

  user: User;
  
  isLoginError: boolean = false;
  success: boolean = false;

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm){
    if(form != null){
      form.reset();
    }
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: '',
      ConfirmPassword: '' 
    }
  }
  onSubmit(email, password) {
    this.spinner.show();
    this.userService.resetPassword(email, password).subscribe((data: any) => {
      if(data != null){
        this.toastrService.info('Check email to complete password reset', 'Password Reset Success');
        this.success = true;
        this.spinner.hide();
      }
      else{
        this.toastrService.error('Reset Password Error', 'Error');
        this.spinner.hide();
      }
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.toastrService.error('Password Reset Failed', 'Error');
      });
  }
}
