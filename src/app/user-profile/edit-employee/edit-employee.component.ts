import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from 'src/app/shared/user.service';
import { MasterService } from 'src/app/shared/master.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  editarray: any = [];
  companyarray: any = [];
  masterarray: any = [];
  getmasters: any=[];
  userDetails;

  showSucessMessage: boolean;
  serverErrorMessages: string;
  editEmployee = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    masters: new FormControl(''),
    joiningDate: new FormControl(''),
    currentSalary: new FormControl(''),
    lastCompany: new FormControl(''),
    companyName: new FormControl('')
  })

  constructor(public employeeService: EmployeeService,private masterService: MasterService, private userService: UserService, private router: ActivatedRoute) { 
    // this.jsonObject = <JSON>this.arrayObj;
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

   this.ViewMaster()

    console.log(this.router.snapshot.params._id);
    this.employeeService.getCurrentData(this.router.snapshot.params._id).subscribe(
      // ({
      //   next:(res)=>{
      //     console.log(res);
      //     this.editarray = res;
      //   },
      //   error:()=>{
      //     alert("error!!!")
      //   }
      // })


        (result)=>{

          this.editEmployee.patchValue(result);
      // this.editEmployee = new FormGroup({
      //   fullName: new FormControl(result['fullName']),
      //   email: new FormControl(result['email']),
      //   password: new FormControl(result['password']),
      //   phone: new FormControl(result['phone']),
      //   masters: new FormControl(result['masters']),
      //   joiningDate: new FormControl(result['joiningDate']),
      //   currentSalary: new FormControl(result['currentSalary']),
      //   lastCompany: new FormControl(result['lastCompany']),
      //   companyName: new FormControl(result['companyName'])
      // })
    }
    );
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

  updateData(){
    // this.employeeService.updateData(this.router.snapshot.params._id, this.editEmployee.value).subscribe((result)=>{
    //   this.showSucessMessage = true;
    //   setTimeout(() => this.showSucessMessage = false, 4000);
    //   console.log(result,"data updated")
    // })

    this.employeeService.updateEmployee(this.router.snapshot.params._id, this.editEmployee.value).subscribe((result: any)=>{
        console.log(result,"data updated");
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
      })
  }
}
