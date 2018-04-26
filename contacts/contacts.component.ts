import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/shared/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

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
