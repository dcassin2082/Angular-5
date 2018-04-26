import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../shared/employee.service';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      this.employeeService.getEmployees();
      form.reset();
    }
    this.employeeService.employee = {
      EmployeeID: null,
      FirstName: '',
      LastName: '',
      Office: '',
      Position: '',
      EmpCode: '',
      EmailAddress: '',
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.EmployeeID == null) {
      form.value.EmployeeID = 0;
      this.employeeService.postEmployee(form.value).subscribe(x => {
        this.toastrService.success('Employee added successfully', 'Employee');
        this.employeeService.getEmployees();
        this.resetForm(form);
      })
    }
    else {
      this.employeeService.putEmployee(form.value.EmployeeID, form.value).subscribe(x => {
        this.toastrService.info('Employee updated successfully', 'Employee');
        this.employeeService.getEmployees();
        this.resetForm(form);
      })
    }
  }
  options = [1, 2, 3];
  optionSelected: any;

  onOptionSelected($event) {
    alert(this.options[1]);
    console.log($event); //option value will be sent as event
  }
}
