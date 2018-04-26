import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user';
import { EmailValidator } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private userService: UserService, private toastrService: ToastrService) { }

  user: User;
  roles: any[];
  success: boolean = false;

  ngOnInit() {
    this.resetForm();
    // this.userService.getAllRoles().subscribe(
    //   (data: any)=>{
    //     data.forEach(obj => obj.selected = false);
    //     this.roles = data;
    //   }
    // );
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
    if(this.roles){
      this.roles.map(x => x.selected = false);
    }
  }
  onSubmit(form: NgForm){
    this.spinner.show();
    this.userService.registerUser(form.value).subscribe((data: any) => {
      if(data != null) {
        this.resetForm(form);
        this.toastrService.success('You must confirm your email before logging in for the first time'
        , 'Registration Succeeded');
        this.spinner.hide();
        this.success = true;
        // redirect to please check your email
      }
      else{
        this.toastrService.error('Registration Error!', 'Error');
        this.spinner.hide();
      }
    });
  }
  updateSelectedRoles(index){
    this.roles[index].selected = !this.roles[index].selected;
  }
}

