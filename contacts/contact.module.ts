import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxMaskModule } from 'ngx-mask'

import { ContactsComponent } from './contacts.component';
import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';


import { ContactService } from './shared/contact.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    ContactsComponent, 
    ContactComponent, 
    ContactListComponent
  ],
  providers: [ContactService]
})
export class ContactModule { }
