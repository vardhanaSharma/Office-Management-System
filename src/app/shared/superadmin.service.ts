import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperadminService {
  
  constructor(private http: HttpClient) { }

  getViewUser() {
    return this.http.get(environment.apiBaseUrl + '/users');
  }
}
