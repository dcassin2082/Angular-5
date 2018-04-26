import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxMaskModule } from 'ngx-mask'

import { CustomersComponent } from './customers.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

import { CustomerService } from './shared/customer.service';
import { StateService } from '../shared/state.service';
import { ValidatorModule } from '../shared/validator.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxMaskModule.forRoot(),
    ValidatorModule
  ],
  declarations: [
    CustomersComponent, 
    CustomerComponent,
    CustomerListComponent
  ],
  providers:[CustomerService, StateService]
})
export class CustomerModule { }
