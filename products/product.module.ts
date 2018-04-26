import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxMaskModule } from 'ngx-mask'

import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './shared/product.service';



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
    ProductsComponent, 
    ProductComponent, 
    ProductListComponent]
    ,
  providers: [ProductService]
})
export class ProductModule { }
