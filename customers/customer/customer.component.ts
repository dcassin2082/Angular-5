import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../shared/customer.service';
import { EmailValidator } from '@angular/forms';
import { StateService } from '../../shared/state.service';
import { State } from '../../shared/state';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService, private stateService: StateService, private toastrService: ToastrService) { }

  states: State[];
  
  ngOnInit() {
    this.resetForm();
    this.stateService.getStates().subscribe(x => this.states = x);
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      this.customerService.getCustomers();
      form.reset();
    }
    this.customerService.customer = {
      CustomerID: null,
      FirstName: '',
      LastName: '',
      Address: '',
      City: '',
      State: '-1',
      Zip: '', 
      Phone: '',
      EmailAddress: '',
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.CustomerID == null) {
      form.value.CustomerID = 0;
      this.customerService.postCustomer(form.value).subscribe(x => {
        this.toastrService.success('Customer added successfully', 'Customer');
        this.customerService.getCustomers();
        this.resetForm(form);
      })
    }
    else {
      this.customerService.putCustomer(form.value.CustomerID, form.value).subscribe(x => {
        this.toastrService.info('Customer updated successfully', 'Customer');
        this.customerService.getCustomers();
        this.resetForm(form);
      })
    }
  }
}
