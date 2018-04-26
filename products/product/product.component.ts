import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      this.productService.getProducts();
      form.reset();
    }
    this.productService.product = {
      ProductId: null,
      Name: '',
      SKU: '',
      Description: '',
      RetailPrice: null,
      Cost: null
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.ProductId == null) {
      form.value.ProductId = 0;
      this.productService.postProduct(form.value).subscribe(x => {
        this.toastrService.success('Product added successfully', 'Product');
        this.productService.getProducts();
        this.resetForm(form);
      })
    }
    else {
      this.productService.putProduct(form.value.ProductId, form.value).subscribe(x => {
        this.toastrService.info('Product updated successfully', 'Product');
        this.productService.getProducts();
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
