import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from '../shared/supplier.service';
import { EmailValidator } from '@angular/forms';
import { StateService } from '../../shared/state.service';
import { State } from '../../shared/state';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  constructor(private supplierService: SupplierService, private stateService: StateService, private toastrService: ToastrService) { }

  states: State[];

  ngOnInit() {
    this.resetForm();
    this.stateService.getStates().subscribe(x => this.states = x);
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      this.supplierService.getSuppliers();
      form.reset();
    }
    this.supplierService.supplier = {
      SupplierId: null,
      Name: '',
      Address: '',
      City: '',
      State: '-1',
      Zip: '',
      Phone: '',
      EmailAddress: ''
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.SupplierId == null) {
      form.value.SupplierId = 0;
      this.supplierService.postSupplier(form.value).subscribe(x => {
        this.toastrService.success('Supplier added successfully', 'Supplier');
        this.supplierService.getSuppliers();
        this.resetForm(form);
      })
    }
    else {
      this.supplierService.putSupplier(form.value.SupplierId, form.value).subscribe(x => {
        this.toastrService.info('Supplier updated successfully', 'Supplier');
        this.supplierService.getSuppliers();
        this.resetForm(form);
      })
    }
  }
}
