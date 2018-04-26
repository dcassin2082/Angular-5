import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../shared/customer.service';
import { Customer } from '../shared/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  constructor(private customerService: CustomerService, private toastrService: ToastrService) { }

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
    this.customerService.getCustomers();
  }
  showForEdit(customer: Customer){
    this.customerService.customer = Object.assign({}, customer);
  }
  onDelete(id: number){
    if(confirm('Delete customer?')==true){
      this.customerService.deleteCustomer(id).subscribe(x => {
        this.toastrService.warning('Customer deleted successfully');
        this.customerService.getCustomers();
        this.customerService.resetCustomer();
      })
    }
  }

}
