import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/shared/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

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
