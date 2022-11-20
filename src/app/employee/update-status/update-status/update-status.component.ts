import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttendenceService } from 'src/app/shared/attendence.service';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MasterService } from 'src/app/shared/master.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { TaskService } from 'src/app/shared/task.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {
  
  panelOpenState = false;
  isExpanded: boolean = true;
  employeedata: any;
  employeepassword: any;
  employeeemail: any;
  employeename: any;
  employeecurrentSalary: any;
  employeephone: any;
  employeelastCompany: any;
  employeejoiningDate: any;
  employeecompanyName: any;
  showSucessMessage: boolean;
  serverErrorMessages: string;
 
  updateTask = new FormGroup({
    projectName: new FormControl(''),
    taskName: new FormControl(''),
    reportingManager: new FormControl(''),
    employeeName: new FormControl(''),
    employeeEmail: new FormControl(''),
    status: new FormControl(''),
    companyName: new FormControl('')
  })

  notificationData = new FormGroup({
    projectName: new FormControl(''),
    taskName: new FormControl(''),
    employeeName: new FormControl(''),
    employeeEmail: new FormControl(''),
    companyName: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
    
  })
  
  constructor(public notificationService: NotificationService,public employeeService: EmployeeService, public taskService: TaskService,private masterService: MasterService, private userService: UserService,public attendenceService: AttendenceService, private router: ActivatedRoute) { 
  }

  ngOnInit(): void {

// console.log("here is id");
console.log(this.router.snapshot.params._id);
this.taskService.getCurrentTaskData(this.router.snapshot.params._id).subscribe(


    (result)=>{

      this.updateTask.patchValue(result);
}
);
  }

updateData(){

  this.taskService.updateStatus(this.router.snapshot.params._id, this.updateTask.value).subscribe((result: any)=>{
      console.log(result,"data updated");
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 4000);
    })
}

// Submit() {
//   console.log("submit notification");

//   var values = 
//     {
//       projectName: this.notificationData.get('projectName').value,
//       taskName: this.notificationData.get('taskName').value,
//       employeeName: this.notificationData.get('employeeName').value,
//       employeeEmail: this.notificationData.get('employeeEmail').value,
//       companyName: this.notificationData.get('companyName').value,
//       date: this.notificationData.get('date').value,
//       time: this.notificationData.get('time').value,
        
//     };
  
//   console.log(values);

//   this.notificationService.postNotification(values).subscribe({
//     next: res => {
//       this.showSucessMessage = true;
//       setTimeout(() => this.showSucessMessage = false, 4000);
//       // this.resetForm();
//     },
//     error: err => {
//       if (err.status === 422) {
//         this.serverErrorMessages = err.error.join('<br/>');
        
//       }
//       else
//         this.serverErrorMessages = 'Something went wrong.Please contact admin.';
//     }
//   });


// }


  
}
