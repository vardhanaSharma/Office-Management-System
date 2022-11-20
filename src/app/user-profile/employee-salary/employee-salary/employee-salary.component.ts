import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MasterService } from 'src/app/shared/master.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.css']
})
export class EmployeeSalaryComponent implements OnInit {
  employeearray: any = [];
  masterarray: any = [];
  getmasters: any=[];
  userDetails;

  constructor(public employeeService: EmployeeService, public masterService: MasterService, private userService: UserService, private router: Router) { 
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: res => {
         this.userDetails = res['user'];
         
       },
      error:  err => { 
         console.log(err);
         
       }
   });

   this.ViewMaster();
  }

  ViewMaster(){
    this.masterService.getViewMaster().subscribe(
 response=>{
  console.log("reponse array");
  console.log(response);
  this.masterarray = response;
  this.masterarray=  this.masterarray.filter((master) => master.companyName === this.userDetails.companyName)
  console.log("reponse array");
  console.log(this.masterarray);

  console.log("Final array");
  this.getmasters = this.masterarray.map(data => data.masterName); 
  console.log(this.getmasters);
     
}      
    )
  }

  ViewEmployees(){
  this.employeeService.getViewEmployee().subscribe(
  response=>{
  console.log("reponse array");
  console.log(response);
  this.employeearray = response;
  this.employeearray=  this.employeearray(this.employeearray.filter((employee) => employee.companyName === this.userDetails.companyName));
  console.log("reponse array");
  console.log(this.employeearray);
  
  }      
    )
  }

}
