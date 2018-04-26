import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
