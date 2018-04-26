import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestMethod, RequestOptions } from '@angular/http';
import { Supplier } from './supplier';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SupplierService {

  constructor(private http: Http) { }

  baseUrl = 'http://localhost:62542/api/Suppliers';
  headerOptions = new Headers({'Content-Type':'application/json'});
  supplier: Supplier;
  suppliers: Supplier[];

  getSuppliers(){
    this.http.get(this.baseUrl).map((data: Response)=> {
      return data.json() as Supplier[];
    }).toPromise().then(x => {
      this.suppliers = x;
    })
  }
  getSupplier(id: number){
    this.http.get(this.baseUrl + '/' + id).map((data: Response)=> {
      return data.json() as Supplier;
    }).toPromise().then(x => {
      this.supplier = x;
    })
  }
  postSupplier(supplier: Supplier){
    var body = JSON.stringify(supplier);
    var requestOptions = new RequestOptions({method: RequestMethod.Post, headers: this.headerOptions});
    return this.http.post(this.baseUrl, body, requestOptions).map(x=> x.json());
  }
  putSupplier(id: number, supplier: Supplier){
    var body = JSON.stringify(supplier);
    var requestOptions = new RequestOptions({method: RequestMethod.Put, headers: this.headerOptions});
    return this.http.put(this.baseUrl + '/' + id, body, requestOptions).map(x=> x.json());
  }
  deleteSupplier(id: number){
    return this.http.delete(this.baseUrl + '/' + id).map(x => x.json());
  }
  resetSupplier(){
    this.supplier = {
      SupplierId: null,
      Name: '',
      Address: '',
      City: '',
      State: '',
      Zip: '',
      Phone: '',
      EmailAddress: ''
    }
  }
}
