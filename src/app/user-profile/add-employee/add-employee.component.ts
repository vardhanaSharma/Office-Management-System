import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Router } from "@angular/router";
import { MasterService } from 'src/app/shared/master.service';

import { UserService } from 'src/app/shared/user.service';
import { Master } from 'src/app/shared/master.model';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  userDetails;
  employeelist;
  employeearray: any = [];
  employeecountarray: any = [];
  lengthhh;
  limitlength;
  // masterarray: any = [];
  companyarray: any = [];
  masterarray: any = [];
  getmasters: any=[];

  masterlist;
  serverErrorMessages: string;
  addEmployee = new FormGroup({
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

  constructor(public employeeService: EmployeeService, private masterService: MasterService, private userService: UserService, private router: Router) { 
  }

  ngOnInit() {
    this.userService.getUserProfile().subscribe({
      next: res => {
         this.userDetails = res['user'];
         
       },
      error:  err => { 
         console.log(err);
         
       }
   });

   this.ViewMaster();

   

   this.employeeService.getViewEmployee().subscribe(
    (employeelist) => {
      this.employeearray = employeelist;
      console.log(employeelist);
      this.employeecountarray = employeelist;


this.employeecountarray = this.employeecountarray.filter((employee) => employee.companyName === this.userDetails.companyName);
console.log("count array");

console.log(this.employeecountarray);
console.log("lenth== "+Object.keys(this.employeecountarray).length);
this.lengthhh = Object.keys(this.employeecountarray).length;
console.log(this.lengthhh);

// if(this.userDetails.plan == 'Free Plan'){
//   console.log("in condition");
//   this.limitlength = 4;  // for limit if 5
//  }
//  if(this.userDetails.plan == 'Standard Plan'){
//   this.limitlength = 5;  // for limit of 6
//  }
//  if(this.userDetails.plan == 'Premium Plan'){
//   this.limitlength = 19;  // for limit of 20
//  }
//  if(this.userDetails.plan == 'Premium Plus Plan'){
//   this.limitlength = 29;  // for limit of 30
//  }

this.limitlength = this.userDetails.maxEmployees;

 console.log("limit")
 console.log(this.limitlength);
    }
  )   
   
  //  this.masterService.getViewMaster().subscribe(
  //   (masterlist) => {
  //     this.masterarray = masterlist;
  //     // this.dataSource = new MatTableDataSource<any>(this.employeearray)

  //     // this.dataSource = new MatTableDataSource<any>(this.employeearray.filter(({ companyName }) =>
  //     // companyName === 'samsung'))

  //     this.dataSource = this.masterarray.filter((master) => master.companyName === this.userDetails.companyName);

  //   }
   
  // )
// console.log("master array");
//   console.log(this.masterarray);
  
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

  Submit() {

    this.employeeService.getViewEmployee().subscribe(
      (employeelist) => {
        this.employeearray = employeelist;
        console.log(employeelist);
        this.employeecountarray = employeelist;
  
  
  this.employeecountarray = this.employeecountarray.filter((employee) => employee.companyName === this.userDetails.companyName);
  console.log("count array");
  
  console.log(this.employeecountarray);
  console.log("lenth== "+Object.keys(this.employeecountarray).length);
  this.lengthhh = Object.keys(this.employeecountarray).length;
  console.log(this.lengthhh);
  
  // if(this.userDetails.plan == 'Free Plan'){
  //   console.log("in condition");
  //   this.limitlength = 4;  // for limit if 5
  //  }
  //  if(this.userDetails.plan == 'Standard Plan'){
  //   this.limitlength = 5;  // for limit of 6
  //  }
  //  if(this.userDetails.plan == 'Premium Plan'){
  //   this.limitlength = 19;  // for limit of 20
  //  }
  //  if(this.userDetails.plan == 'Premium Plus Plan'){
  //   this.limitlength = 29;  // for limit of 30
  //  }

  this.limitlength = this.userDetails.maxEmployees;

  console.log("limit")
  console.log(this.limitlength);
      }
    )

if((this.lengthhh)> this.limitlength){
  alert('Cannot add more please upgrde your plan limit: '+ (this.limitlength+1));
}
  else{
    console.log("hello");

    var values = 
      {
        fullName: this.addEmployee.get('fullName').value,
        email: this.addEmployee.get('email').value,
        password: this.addEmployee.get('password').value,
        phone: this.addEmployee.get('phone').value,
        masters: this.addEmployee.get('masters').value,
        joiningDate: this.addEmployee.get('joiningDate').value,
        currentSalary: this.addEmployee.get('currentSalary').value,
        lastCompany: this.addEmployee.get('lastCompany').value,
        companyName: this.addEmployee.get('companyName').value,
        
      };
    
    console.log(values);

    this.employeeService.postEmployee(values).subscribe({
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
  }

  resetForm() {
    this.addEmployee.controls['masters'].reset();
    this.addEmployee.controls['fullName'].reset();
    this.addEmployee.controls['email'].reset();
    this.addEmployee.controls['password'].reset();
    this.addEmployee.controls['phone'].reset();
    this.addEmployee.controls['joiningDate'].reset();
    this.addEmployee.controls['currentSalary'].reset();
    this.addEmployee.controls['lastCompany'].reset();
}
  
  // onSubmit(form: NgForm) {

  //   console.log(form.value);
  //   this.employeeService.postEmployee(form.value).subscribe({
  //     next: res => {
  //       this.showSucessMessage = true;
  //       setTimeout(() => this.showSucessMessage = false, 4000);
  //       // this.resetForm(form);
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


  // resetForm(form: NgForm) {
  //   this.employeeService.selectedEmployee = {
  //     fullName: '',
  //     email: '',
  //     password: '',
  //     phone: '',
  //     masters:'',
  //     companyName: ''
  //   };
  //   form.resetForm();
  //   this.serverErrorMessages = '';
  // }

  onAddEmployee(){
    this.router.navigate(['/addemployee']);
  }

  backToProfile(){    
    this.router.navigate(['/userprofile']);
  }

  

}
