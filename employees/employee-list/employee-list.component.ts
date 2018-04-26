import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private toastrService: ToastrService) { }

   // search
   filter: string;
   clearSearch() {
     this.filter = null
   }
 
   //sorting
   key: string = 'FirstName';  
   reverse: boolean = false;
   sort(key) {
     this.key = key;
     this.reverse = !this.reverse;
   }
 
   // paging
   p: number = 1;  

  ngOnInit() {
    this.employeeService.getEmployees();
  }
  showForEdit(employee: Employee){
    this.employeeService.employee = Object.assign({}, employee);
  }
  onDelete(id: number){
    if(confirm('Delete employee?')==true){
      this.employeeService.deleteEmployee(id).subscribe(x => {
        this.toastrService.warning('Employee deleted successfully');
        this.employeeService.getEmployees();
        this.employeeService.resetEmployee();
      })
    }
  }

}
