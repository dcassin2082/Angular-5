import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  userClaims: any;

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
      //this.userService.loggedIn = true;
    })

    // you can add additional roles based functionality here
    if (this.userService.roleMatch(['Member'])) {
      // blah blah blah
    }
  }
  register() {
    this.router.navigate(['/register']);
  }
  login() {
    this.router.navigate(['/login']);
  }
  logout() {
    localStorage.removeItem('userToken');
    this.userService.loggedIn = false;
    this.router.navigate(['/login']);
    localStorage.setItem('logged_out', 'true');
  }
}
