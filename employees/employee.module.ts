import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxMaskModule } from 'ngx-mask'


import { EmployeesComponent } from './employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

import { EmployeeService } from './shared/employee.service';

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
    EmployeesComponent, 
    EmployeeComponent, 
    EmployeeListComponent
  ],
  providers: [EmployeeService]
})
export class EmployeeModule { }
