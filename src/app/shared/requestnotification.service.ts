import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Requestnotification } from './requestnotification.model';

@Injectable({
  providedIn: 'root'
})
export class RequestnotificationService {
  selectedRequstNotification: Requestnotification = {
    info: '',
    fullName: '',
    email:'',
    companyName: '',
    date: '',
    time: ''
    
  };
  constructor(private http: HttpClient) { }

    postRequestnotification(requestnotification: Requestnotification){
      return this.http.post(environment.apiBaseUrl+'/requestnotificationregister',requestnotification);
    }
    getViewNotificationEmployeeByEmail(email: any){
      return this.http.get(environment.apiBaseUrl+'/employeerequestnotification/'+email);
       }
  }