import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  selectedNotification: Notification = {
    info: '',
    companyName: '',
    date: '',
    time: ''
    
  };
  constructor(private http: HttpClient, 
  
    ) { }

    postNotification(notification: Notification){
      return this.http.post(environment.apiBaseUrl+'/notificationregister',notification);
    }

    getViewNotificationEmployeeByCompany(companyName: any){
      return this.http.get(environment.apiBaseUrl+'/employeenotification/'+companyName);
       }
}
