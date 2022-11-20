import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Attendence } from './attendence.model';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  selectedAttendence: Attendence = {
    fullName: '',
    date: '',
    attendenceStatus: '',
    companyName: ''
  };

  constructor(private http: HttpClient) { }

  postAttendence(attendence: Attendence){
    return this.http.post(environment.apiBaseUrl+'/attendence',attendence);
  }

  getViewEmployeeAttendence() {
    return this.http.get(environment.apiBaseUrl + '/employeesattendence');
  }
}
