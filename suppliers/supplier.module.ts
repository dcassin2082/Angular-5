import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxMaskModule } from 'ngx-mask'

import { SuppliersComponent } from './suppliers.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';

import { SupplierService } from './shared/supplier.service';
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
    SuppliersComponent, 
    SupplierComponent, 
    SupplierListComponent
  ],
  providers: [SupplierService]
})
export class SupplierModule { }
