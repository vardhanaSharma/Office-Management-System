import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { UserService } from 'src/app/shared/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
 
  showSucessMessage: boolean;
  dropdownList: any = [];
  selectedItems = [];
  today = new Date();;
  
  addNotification = new FormGroup({
    info: new FormControl(''),
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

  constructor(public notificationService: NotificationService,public employeeService: EmployeeService, private userService: UserService, private router: Router) { 
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
  }


  Submit() {
    console.log("hello");

    var values = 
      {
        info: this.addNotification.get('info').value,
        date: this.addNotification.get('date').value,
        time: this.addNotification.get('time').value,
        companyName: this.addNotification.get('companyName').value

      };
    
    console.log(values);

    this.notificationService.postNotification(values).subscribe({
      next: res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm();
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
    this.addNotification.reset();
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
}

