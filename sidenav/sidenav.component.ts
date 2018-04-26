import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  userClaims: any;

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any)=> {
      this.userClaims = data;
      //this.userService.loggedIn = true;
    })
      
    // you can add additional roles based functionality here
    if(this.userService.roleMatch(['Member'])){
      // blah blah blah
    }
  }
  logout(){
    localStorage.removeItem('userToken');
    this.userService.loggedIn = false;
    this.router.navigate(['/login']);
  }

}
