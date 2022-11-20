import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { UserService } from 'src/app/shared/user.service';
import { DatePipe } from '@angular/common';
import { RequestnotificationService } from 'src/app/shared/requestnotification.service';

@Component({
  selector: 'app-requestnotification',
  templateUrl: './requestnotification.component.html',
  styleUrls: ['./requestnotification.component.css']
})
export class RequestnotificationComponent implements OnInit {

  showSucessMessage: boolean;
  dropdownList: any = [];
  selectedItems = [];
  today = new Date();selectedEmp: any;
  getSelectdEmployeeData: any;
  getSelectdEmployeeEmail: any;
  getSelectdEmployeeEmailOutOfArray: any;
;
  
  addRequestNotification = new FormGroup({
    info: new FormControl(''),
    fullName: new FormControl(''),
    email: new FormControl(''),
    date: new FormControl(),
    time: new FormControl(''),
    companyName: new FormControl('')

  })
  userDetails;
  employeelist;
  employeearray: any = [];
  employeecountarray: any = [];
  serverErrorMessages: any;
  lengthhh: number;

  constructor(public requestnotificationService: RequestnotificationService,public employeeService: EmployeeService, private userService: UserService, private router: Router) { 
  }
  ngOnInit(): void {
    this.today = new Date();
    this.changeFormat(this.today);

    this.userService.getUserProfile().subscribe({
      next: res => {
         this.userDetails = res['user'];
         
       },
      error:  err => { 
         console.log(err);
         
       }
   });


this.viewEmployee();
  }

  viewEmployee(){
    this.employeeService.getViewEmployee().subscribe(
     response=>{
      console.log("reponse array");
      console.log(response);
      this.employeearray = response;
      this.employeearray=  this.employeearray.filter((master) => master.companyName === this.userDetails.companyName)
      console.log("reponse array");
      console.log(this.employeearray);
    
      console.log("Final countarray");
      this.employeecountarray = this.employeearray.map(data => data.fullName); 
      console.log(this.employeecountarray);
         
    }      
        )
      }
    

  Submit() {
    console.log("hello");

    var values = 
      {
        info: this.addRequestNotification.get('info').value,
        fullName: this.addRequestNotification.get('fullName').value,
        email: this.addRequestNotification.get('email').value,
        date: this.addRequestNotification.get('date').value,
        time: this.addRequestNotification.get('time').value,
        companyName: this.addRequestNotification.get('companyName').value

      };
    
    console.log(values);

    this.requestnotificationService.postRequestnotification(values).subscribe({
      next: res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm();
        console.log("posted values");
        console.log(res);
        
        
      },
      error: err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
          
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    });
  }

  resetForm() {
    this.addRequestNotification.reset();
}


changedDate = '';
changedTime = '';
pipe = new DatePipe('en-US');
changeFormat(today:any){
  let ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY' );
  let ChangedFormatTime = this.pipe.transform(this.today, 'h:mm:ss' );
  this.changedDate = ChangedFormat;
  this.changedTime = ChangedFormatTime;

  console.log(this.changedDate);
}

onChange2(getTargetEmployee : any) {
  this.selectedEmp =getTargetEmployee.target.value;
  console.log("selectedEmp: "+ this.selectedEmp);
   this.getSelectdEmployeeData = this.employeearray.filter((emp) => emp.fullName === this.selectedEmp);
  console.log("selected emp data");
  console.log(this.getSelectdEmployeeData);
  this.getSelectdEmployeeEmail = this.getSelectdEmployeeData.map(emp => emp.email);
  console.log("got email array");
  console.log(this.getSelectdEmployeeEmail);

  this.getSelectdEmployeeEmailOutOfArray = this.getSelectdEmployeeEmail[0];
  console.log("got email");
  console.log(this.getSelectdEmployeeEmailOutOfArray);
}
}

