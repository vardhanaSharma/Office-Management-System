import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  selectedEmployee: Employee = {
    fullName: '',
    email: '',
    password: '',
    phone: '',
    masters: '',
    joiningDate: '',
    currentSalary: '',
    lastCompany: '',
    companyName: ''
  };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postEmployee(employee: Employee){
    return this.http.post(environment.apiBaseUrl+'/employeeregister',employee);
  }

  uurl = "http://localhost:3000/api/employees"
getIndivisualEmployee(_id){
  return this.http.get(`${this.uurl}/${_id}`);
  
}
  getViewEmployee() {
    return this.http.get(environment.apiBaseUrl + '/employees');
  }

  url = "http://localhost:3000/api/edit";
  url2 = "http://localhost:3000/api/update";
  url1 = "http://localhost:3000/api/delete";
  getCurrentData(_id){
    // return this.http.get(environment.apiBaseUrl + '/edit',_id);
    return this.http.get(`${this.url}/${_id}`)
  }

  // updateData(_id,data){
  //   return this.http.put(`${this.url2}/${_id}`,data)
  // }

   updateEmployee(_id:any,employee:any){
    return this.http.put('http://localhost:3000/api/update/'+_id,employee)
  }

  delete(_id: any) { 
    return this.http.delete(`${this.url1}/${_id}`);
  }

  getEmployeeByEmail(email: any){
    return this.http.get(environment.apiBaseUrl+'/employeeexistdata/'+email);
     }

  getEmployeeByName(name: any){
      return this.http.get(environment.apiBaseUrl+'/employeeexistdatabyname/'+name);
       }
    
  getEmployeeData(email) {
      return this.http.get(environment.apiBaseUrl + '/employeedata/'+ email);
    }
  



  
}