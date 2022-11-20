import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from './task.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  selectedTask: Task = {
    projectName: '',
    taskName: '',
    reportingManager: '',
    employeeName: '',
    employeeEmail: '',
    status: '',
    companyName: ''
    
  };

  constructor(private http: HttpClient, 
  
    ) { }

  postTask(task: Task){
    return this.http.post(environment.apiBaseUrl+'/taskregister',task);
  }

  getViewTask() {
    return this.http.get(environment.apiBaseUrl + '/tasks');
  }

  getViewTaskEmployeeByEmail(email: any){
    return this.http.get(environment.apiBaseUrl+'/eployeeprojecttask/'+email);
     }

     url = "http://localhost:3000/api/updatestatus";
     url2 = "http://localhost:3000/api/update";
     url1 = "http://localhost:3000/api/delete";
     
     getCurrentTaskData(_id){
       return this.http.get(`${this.url}/${_id}`)
     }

     updateStatus(_id:any,task:any){
      return this.http.put('http://localhost:3000/api/updatethestatus/'+_id,task)
    }
}
