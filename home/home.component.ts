import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/shared/user.service';
import { Keepalive } from '@ng-idle/keepalive';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  constructor(private idle: Idle, private keepalive: Keepalive, private router : Router, private userService: UserService) { 
    idle.setIdle(150);
    idle.setTimeout(150);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      localStorage.removeItem('userToken');
      this.userService.loggedIn = false;
      this.router.navigate(['/login']);
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');
    keepalive.interval(150);
    keepalive.onPing.subscribe(() => this.lastPing = new Date());
    this.reset();
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Running.';
    this.timedOut = false;
  }
 
  userClaims: any;

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any)=> {
      this.userClaims = data;
      if(this.userClaims == null){
        this.userService.loggedIn = false;
        this.router.navigate(['/login']);
      }
      else{
        this.userService.loggedIn = true;
      }
    })
    // you can add additional roles based functionality here
    if(this.userService.roleMatch(['Member'])){
      // blah blah blah
    }
  }
  logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
