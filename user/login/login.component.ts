import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(private toastrService: ToastrService, private spinner: NgxSpinnerService,  private userService: UserService, private router: Router) { }

  isLoginError: boolean = false;

  ngOnInit() {
    this.userService.loggedIn = false;
  }

  onSubmit(username, password) {
    this.spinner.show();
    // need to check if user has confirmed their email
    this.userService.userAuthentication(username, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      localStorage.setItem('userRoles', data.role);
      this.router.navigate(['/home']);
      this.userService.loggedIn = true;
      this.spinner.hide();
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.toastrService.error('Login  Failed', 'Error');
        this.spinner.hide();
      });
  }
  forgotPassword(){
    this.router.navigate(['/resetpassword']);
  }
  resetPassword(username, password){
    this.userService.resetPassword(username, password);
  }
}