import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HeaderRoutingModule } from './header-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderRoutingModule
  ],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
