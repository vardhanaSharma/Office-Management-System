import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MasterService } from 'src/app/shared/master.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {
  model ={
    email :'',
    password:''
  };

  employeedata: any;
  employeepassword: any;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: boolean;
  showSucessMessage: boolean;

  constructor(public employeeService: EmployeeService, private masterService: MasterService, private userService: UserService, private router: Router) { 
  }

  ngOnInit(): void {
  }

  onSubmit(signInForm : NgForm){

    console.log(signInForm.value);
    console.log('email:' + signInForm.controls['email'].value);
    console.log('password:' + signInForm.controls['password'].value);

    this.employeeService.getEmployeeByEmail(signInForm.controls['email'].value).subscribe(
      (result: any)=>{
      
        this.employeedata = result;
        console.log(this.employeedata,"data");


        
        console.log("array password");
        
        // console.log(this.employeedata.password);
        this.employeepassword = this.employeedata.map(data => data.password); 
        console.log(this.employeepassword);
        

        if(signInForm.controls['password'].value==this.employeepassword){
          this.showSucessMessage=true;
          
          console.log("match");
          
          this.router.navigate(['/employeedashboard/'+signInForm.controls['email'].value]);
             
        }else{
          this.serverErrorMessages = true;
          console.log("no worng");

        }

      }
        );
        // console.log(this.employeedata,"data");

        // this.getmasters = this.masterarray.map(data => data.masterName); 
        // console.log(this.getmasters);


    }

    // (result: any)=>{

    // console.log('Form Valid:' + signInForm.valid);
    // console.log('Form Submitted:' + signInForm.submitted);

    // this.employeeService.login(form.value).subscribe(
    //   res => {
    //     this.userService.setToken(res['token']);
    //     this.userService.UpdateMenu.next();
    //     this.router.navigateByUrl('/userprofile');
    //   },
    //   err => {
    //     this.serverErrorMessages = err.error.message;
    //   }
    // );
  

}
