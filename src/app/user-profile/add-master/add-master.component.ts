import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Router } from "@angular/router";
import { UserService } from 'src/app/shared/user.service';
import { MasterService } from 'src/app/shared/master.service';

@Component({
  selector: 'app-add-master',
  templateUrl: './add-master.component.html',
  styleUrls: ['./add-master.component.css']
})
export class AddMasterComponent implements OnInit {
  showSucessMessage: boolean;
  userDetails;
  
  serverErrorMessages: string;
  addMaster = new FormGroup({
    masterName: new FormControl(''),
    companyName: new FormControl('')
  })

//   v = [];

// removev(i){
//   this.v.splice(i,1);
// }

// addv(){
//   this.v.push({masterName:""});
// }

  constructor(public employeeService: EmployeeService, public masterService: MasterService, private userService: UserService, private router: Router) { 
    // this.jsonObject = <JSON>this.arrayObj;
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

  }


  Submit() {

    var values = 
      {
        masterName: this.addMaster.get('masterName').value,
        companyName: this.addMaster.get('companyName').value
        
      };
    
    console.log(values);

    this.masterService.postMaster(values).subscribe({
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
    this.addMaster.controls['masterName'].reset()
}
  
  // onSubmit(form: NgForm) {

  //   console.log(form.value);
  //   this.employeeService.postEmployee(form.value).subscribe({
  //     next: res => {
  //       this.showSucessMessage = true;
  //       setTimeout(() => this.showSucessMessage = false, 4000);
  //       this.resetForm(form);
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
  //     companyName: ''
  //   };
  //   form.resetForm();
  //   this.serverErrorMessages = '';
  // }

  onAddMaster(){
    this.router.navigate(['/addmaster']);
  }

  backToProfile(){    
    this.router.navigate(['/userprofile']);
  }

}
