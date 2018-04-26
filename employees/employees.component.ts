import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private router : Router, private userService: UserService) { }

  userClaims: any;

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any)=> {
      this.userClaims = data;
      if(this.userClaims == null){
        this.router.navigate(['login']);
        this.userService.loggedIn = false;
      }
      this.userService.loggedIn = true;
    })
  }
}