import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Observable, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    companyUrl: '',
    plan: '',
    maxEmployees:'',
    
  };

  tokenresponse: any;
  private _updatemenu = new Subject<void>();
  get UpdateMenu(){
return this._updatemenu;
  }

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

 getPlanByToken(token:any){
  let _token=token.split('.')[1];
  this.tokenresponse=JSON.parse(atob(_token));
  console.log(this.tokenresponse);
  return this.tokenresponse.plan;
  
 }

getMenuByPlan(plan: any){
return this.http.get(environment.apiBaseUrl+'/getMenuByPlan/'+plan);
 }

haveAccess(plan: any,menu: any){
  return this.http.get(environment.apiBaseUrl+'/haveAccess?plan='+plan+'&menu='+menu);

 }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
  makePayment(stripeToken: any): Observable<any>{
    // const url = "http://localhost:3000/api/checkout/"
    // return this.http.post<any>(url,{token:stripeToken})
    return this.http.post(environment.apiBaseUrl+'/checkout',{token:stripeToken});

  }

  getViewPlans() {
    return this.http.get(environment.apiBaseUrl + '/plans');
  }
}