import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from './user';
import { EmailValidator } from '@angular/forms';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  readonly baseUrl = 'http://localhost:62542';

  loggedIn : boolean = false;

  registerUser(user: User){
    const body = {
      UserName: user.UserName,
      Password: user.Password, 
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var requestHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.baseUrl + '/api/User/Register', body, { headers: requestHeader});
  }
  resetPassword(email, password){
    const body = {
      Email: email,
      Password: password
    }
    var requestHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.baseUrl+'/api/ForgotPassword',body, {headers: requestHeader});
  }
  userAuthentication(username, password){
    var data = "username="+username+"&password="+password+"&grant_type=password";
    var requestHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded', 'No-Auth':'True'});
    return this.http.post(this.baseUrl+'/token',data, {headers: requestHeader});
  }
  getUserClaims(){
    return this.http.get(this.baseUrl+'/api/GetUserClaims');
  }
  getAllRoles(){
    var requestHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.get(this.baseUrl + '/api/GetAllRoles', { headers: requestHeader});
  }
  roleMatch(allowedRoles) : boolean{
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    // debugger;
    allowedRoles.forEach(element => {
      if(userRoles.indexOf(element) > -1){
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
