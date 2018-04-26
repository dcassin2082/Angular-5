import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestMethod, RequestOptions } from '@angular/http';
import { Customer } from './customer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerService { 

  constructor(private http: Http) { }

  baseUrl = 'http://localhost:62542/api/Customers';
  headerOptions = new Headers({'Content-Type':'application/json'});
  customer: Customer;
  customers: Customer[];

  getCustomers(){
    this.http.get(this.baseUrl).map((data: Response)=> {
      return data.json() as Customer[];
    }).toPromise().then(x => {
      this.customers = x;
    })
  }
  getCustomer(id: number){
    this.http.get(this.baseUrl + '/' + id).map((data: Response)=> {
      return data.json() as Customer;
    }).toPromise().then(x => {
      this.customer = x;
    })
  }
  postCustomer(customer: Customer){
    var body = JSON.stringify(customer);
    var requestOptions = new RequestOptions({method: RequestMethod.Post, headers: this.headerOptions});
    return this.http.post(this.baseUrl, body, requestOptions).map(x=> x.json());
  }
  putCustomer(id: number, customer: Customer){
    var body = JSON.stringify(customer);
    var requestOptions = new RequestOptions({method: RequestMethod.Put, headers: this.headerOptions});
    return this.http.put(this.baseUrl + '/' + id, body, requestOptions).map(x=> x.json());
  }
  deleteCustomer(id: number){
    return this.http.delete(this.baseUrl + '/' + id).map(x => x.json());
  }
  resetCustomer(){
    this.customer = {
      CustomerID: null,
      FirstName: '',
      LastName: '',
      Address: '',
      City: '',
      State: '',
      Zip: '',
      Phone: '',
      EmailAddress: ''
    }
  }
}
