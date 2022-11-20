import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendenceService } from 'src/app/shared/attendence.service';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MasterService } from 'src/app/shared/master.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { TaskService } from 'src/app/shared/task.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-my-notification',
  templateUrl: './my-notification.component.html',
  styleUrls: ['./my-notification.component.css']
})
export class MyNotificationComponent implements OnInit {
  serverErrorMessages: string;
  notificationdata: any;
  employeepassword: any;
  employeeemail: any;
  employeename: any;
  employeecurrentSalary: any;
  employeephone: any;
  employeelastCompany: any;
  employeejoiningDate: any;
  employeecompanyName: any;

  showSucessMessage: boolean;
  tasklist;
  userDetails;
  taskarray: any = [];
  taskcountarray: any = [];
  lengthhh;
  notificationemail: any;
  notificationeCompany: any;
  constructor(public notificationService: NotificationService,public employeeService: EmployeeService, public taskService: TaskService,private masterService: MasterService, private userService: UserService,public attendenceService: AttendenceService, private router: ActivatedRoute) { 
  }
  

  ngOnInit(): void {
    this.notificationService.getViewNotificationEmployeeByCompany((this.router.snapshot.params.companyName)).subscribe(
      {
        next:(res)=>{
          console.log(res);
          this.notificationdata = res;
          this.notificationeCompany = this.notificationdata.map(data => data.companyName); 
          console.log("Company Name");
          
          console.log(this.notificationeCompany[0]);
          this.viewEmployee(this.notificationeCompany[0]);
         
        },
        error:()=>{
          alert("error!!!")
        }
      }   
        );
  }

  viewEmployee(companyName:any){

    this.notificationService.getViewNotificationEmployeeByCompany(companyName)
  .subscribe({
    next:(res)=>{
      console.log(res);
      this.notificationdata = res;

      // this.employeename = this.employeedata.map(data => data.fullName); 
      // this.employeeemail = this.employeedata.map(data => data.email); 
      // this.employeepassword = this.employeedata.map(data => data.password); 
      // this.employeephone = this.employeedata.map(data => data.phone); 
      // this.employeecurrentSalary = this.employeedata.map(data => data.currentSalary); 
      // this.employeejoiningDate = this.employeedata.map(data => data.joiningDate); 
      // this.employeelastCompany = this.employeedata.map(data => data.lastCompany); 
      // this.employeecompanyName = this.employeedata.map(data => data.companyName); 

      // console.log("email : "+this.employeeemail);
      
    },
    error:()=>{
      alert("error!!!")
    }
  })
  }
}
