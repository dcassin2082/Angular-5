import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestMethod, RequestOptions } from '@angular/http';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  baseUrl = 'http://localhost:62542/api/Products';
  headerOptions = new Headers({'Content-Type':'application/json'});
  product: Product;
  products: Product[];

  getProducts(){
    this.http.get(this.baseUrl).map((data: Response)=> {
      return data.json() as Product[];
    }).toPromise().then(x => {
      this.products = x;
    })
  }
  getProduct(id: number){
    this.http.get(this.baseUrl + '/' + id).map((data: Response)=> {
      return data.json() as Product;
    }).toPromise().then(x => {
      this.product = x;
    })
  }
  postProduct(product: Product){
    var body = JSON.stringify(product);
    var requestOptions = new RequestOptions({method: RequestMethod.Post, headers: this.headerOptions});
    return this.http.post(this.baseUrl, body, requestOptions).map(x=> x.json());
  }
  putProduct(id: number, product: Product){
    var body = JSON.stringify(product);
    var requestOptions = new RequestOptions({method: RequestMethod.Put, headers: this.headerOptions});
    return this.http.put(this.baseUrl + '/' + id, body, requestOptions).map(x=> x.json());
  }
  deleteProduct(id: number){
    return this.http.delete(this.baseUrl + '/' + id).map(x => x.json());
  }
  resetProduct(){
    this.product = {
      ProductId: null,
      Name: '',
      Description: '',
      SKU: '',
      RetailPrice: null,
      Cost: null
    }
  }
}
