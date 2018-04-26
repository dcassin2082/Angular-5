import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService, private toastrService: ToastrService) { }

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
    this.productService.getProducts();
  }
  showForEdit(product: Product){
    this.productService.product = Object.assign({}, product);
  }
  onDelete(id: number){
    if(confirm('Delete product?')==true){
      this.productService.deleteProduct(id).subscribe(x => {
        this.toastrService.warning('Product deleted successfully');
        this.productService.getProducts();
        this.productService.resetProduct();
      })
    }
  }

}
