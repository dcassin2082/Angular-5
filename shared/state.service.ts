import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { State } from './state';


@Injectable()
export class StateService {

  constructor(private http: Http) { }

  baseUrl = 'http://localhost:62542/api/states';
  headerOptions = new Headers({'Content-Type':'application/json'});
  state: State;
  public states: State[];

  getStates() : Observable<State[]>{
   return this.http.get(this.baseUrl).map(response => response.json());
  }
}
