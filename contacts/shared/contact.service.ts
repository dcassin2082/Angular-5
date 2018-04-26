import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestMethod, RequestOptions } from '@angular/http';
import { Contact } from './contact';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContactService {

  constructor(private http: Http) { }

  baseUrl = 'http://localhost:62542/api/contacts';
  headerOptions = new Headers({'Content-Type':'application/json'});
  contact: Contact;
  contacts: Contact[];

  getContacts(){
    this.http.get(this.baseUrl).map((data: Response)=> {
      return data.json() as Contact[];
    }).toPromise().then(x => {
      this.contacts = x;
    })
  }
  getContact(id: number){
    this.http.get(this.baseUrl + '/' + id).map((data: Response)=> {
      return data.json() as Contact;
    }).toPromise().then(x => {
      this.contact = x;
    })
  }
  postContact(contact: Contact){
    var body = JSON.stringify(contact);
    var requestOptions = new RequestOptions({method: RequestMethod.Post, headers: this.headerOptions});
    return this.http.post(this.baseUrl, body, requestOptions).map(x=> x.json());
  }
  putContact(id: number, contact: Contact){
    var body = JSON.stringify(contact);
    var requestOptions = new RequestOptions({method: RequestMethod.Put, headers: this.headerOptions});
    return this.http.put(this.baseUrl + '/' + id, body, requestOptions).map(x=> x.json());
  }
  deleteContact(id: number){
    return this.http.delete(this.baseUrl + '/' + id).map(x => x.json());
  }
  resetContact(){
    this.contact = {
      ContactID: null,
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      Company: '',
      Phone: ''
    }
  }
}
