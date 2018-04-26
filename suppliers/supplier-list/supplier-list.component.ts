import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from '../shared/supplier.service';
import { Supplier } from '../shared/supplier';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {

  constructor(private supplierService: SupplierService, private toastrService: ToastrService) { }

   // search
   filter: string;
   clearSearch() {
     this.filter = null
   }
 
   //sorting
   key: string = 'Name';  
   reverse: boolean = false;
   sort(key) {
     this.key = key;
     this.reverse = !this.reverse;
   }
 
   // paging
   p: number = 1;  

  ngOnInit() {
    this.supplierService.getSuppliers();
  }
  showForEdit(supplier: Supplier){
    this.supplierService.supplier = Object.assign({}, supplier);
  }
  onDelete(id: number){
    if(confirm('Delete supplier?')==true){
      this.supplierService.deleteSupplier(id).subscribe(x => {
        this.toastrService.warning('Supplier deleted successfully');
        this.supplierService.getSuppliers();
        this.supplierService.resetSupplier();
      })
    }
  }

}
