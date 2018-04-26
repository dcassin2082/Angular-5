import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestMethod, RequestOptions } from '@angular/http';
import { Employee } from './employee';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployeeService {

  constructor(private http: Http) { }

  baseUrl = 'http://localhost:62542/api/Employees';
  headerOptions = new Headers({'Content-Type':'application/json'});
  employee: Employee;
  employees: Employee[];

  getEmployees(){
    this.http.get(this.baseUrl).map((data: Response)=> {
      return data.json() as Employee[];
    }).toPromise().then(x => {
      this.employees = x;
    })
  }
  getEmployee(id: number){
    this.http.get(this.baseUrl + '/' + id).map((data: Response)=> {
      return data.json() as Employee;
    }).toPromise().then(x => {
      this.employee = x;
    })
  }
  postEmployee(employee: Employee){
    var body = JSON.stringify(employee);
    var requestOptions = new RequestOptions({method: RequestMethod.Post, headers: this.headerOptions});
    return this.http.post(this.baseUrl, body, requestOptions).map(x=> x.json());
  }
  putEmployee(id: number, employee: Employee){
    var body = JSON.stringify(employee);
    var requestOptions = new RequestOptions({method: RequestMethod.Put, headers: this.headerOptions});
    return this.http.put(this.baseUrl + '/' + id, body, requestOptions).map(x=> x.json());
  }
  deleteEmployee(id: number){
    return this.http.delete(this.baseUrl + '/' + id).map(x => x.json());
  }
  resetEmployee(){
    this.employee = {
      EmployeeID: null,
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      Position: '',
      EmpCode: '',
      Office: ''
    }
  }
}
