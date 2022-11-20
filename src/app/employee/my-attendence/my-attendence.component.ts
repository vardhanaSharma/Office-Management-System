import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendenceService } from 'src/app/shared/attendence.service';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MasterService } from 'src/app/shared/master.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-my-attendence',
  templateUrl: './my-attendence.component.html',
  styleUrls: ['./my-attendence.component.css']
})
export class MyAttendenceComponent implements OnInit {
  serverErrorMessages: string;
  employeedata: any;
  employeepassword: any;
  employeeemail: any;
  employeename: any;
  employeecurrentSalary: any;
  employeephone: any;
  employeelastCompany: any;
  employeejoiningDate: any;
  employeecompanyName: any;

  addAttendence = new FormGroup({
    fullName: new FormControl(''),
    date: new FormControl((new Date()).toISOString().substring(0,10)),
    attendenceStatus: new FormControl(''),
    companyName: new FormControl('')
  })
  showSucessMessage: boolean;

  constructor(public employeeService: EmployeeService, private masterService: MasterService, private userService: UserService,public attendenceService: AttendenceService, private router: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.employeeService.getEmployeeByEmail((this.router.snapshot.params.email)).subscribe(
      {
        next:(res)=>{
          console.log(res);
          this.employeedata = res;
          // console.log("values"+ this.employeedata.fullName.value)
          this.employeeemail = this.employeedata.map(data => data.email); 
          console.log("hello values");
          
          console.log(this.employeeemail);
          this.viewEmployee(this.employeeemail);
        
        },
        error:()=>{
          alert("error!!!")
        }
      }   
        );

  }

  viewEmployee(email:any){

    this.employeeService.getEmployeeByEmail(email)
  .subscribe({
    next:(res)=>{
      console.log(res);
      this.employeedata = res;

      this.employeename = this.employeedata.map(data => data.fullName); 
      this.employeeemail = this.employeedata.map(data => data.email); 
      this.employeepassword = this.employeedata.map(data => data.password); 
      this.employeephone = this.employeedata.map(data => data.phone); 
      this.employeecurrentSalary = this.employeedata.map(data => data.currentSalary); 
      this.employeejoiningDate = this.employeedata.map(data => data.joiningDate); 
      this.employeelastCompany = this.employeedata.map(data => data.lastCompany); 
      this.employeecompanyName = this.employeedata.map(data => data.companyName); 

      console.log("email : "+this.employeeemail);
      
    },
    error:()=>{
      alert("error!!!")
    }
  })
  }
  


  Submit() {

    console.log("hello");

    var values = 
      {
        fullName: this.addAttendence.get('fullName').value,
        date: this.addAttendence.get('date').value,
        attendenceStatus: this.addAttendence.get('attendenceStatus').value,
        companyName: this.addAttendence.get('companyName').value,
        
      };
    
    console.log(values);

    this.attendenceService.postAttendence(values).subscribe({
      next: res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
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
  }


