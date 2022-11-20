import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ProjectService } from 'src/app/shared/project.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-employee-project',
  templateUrl: './employee-project.component.html',
  styleUrls: ['./employee-project.component.css']
})
export class EmployeeProjectComponent implements OnInit {
  showSucessMessage: boolean;
  dropdownList: any = [];
  selectedItems = [];
  dropdownSettings : IDropdownSettings;

  addProject = new FormGroup({
    projectName: new FormControl(''),
    projectDesc: new FormControl(''),
    reportingManager: new FormControl(''),
    projectEmployee: new FormControl(''),
    companyName: new FormControl('')

  })
  userDetails;
  employeelist;
  employeearray: any = [];
  employeecountarray: any = [];
  serverErrorMessages: any;
  lengthhh: number;
 
  constructor(public employeeService: EmployeeService, public projectService: ProjectService, private userService: UserService, private router: Router) { 
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


  //  this.dropdownList = [
  //   { item_id: 1, item_text: 'Mumbai' },
  //   { item_id: 2, item_text: 'Bangaluru' },
  //   { item_id: 3, item_text: 'Pune' },
  //   { item_id: 4, item_text: 'Navsari' },
  //   { item_id: 5, item_text: 'New Delhi' }
  // ];
  // this.selectedItems = [
  //   { item_id: 3, item_text: 'Pune' },
  //   { item_id: 4, item_text: 'Navsari' }
  // ];
  // this.dropdownSettings= {
  //   singleSelection: false,
  //   idField: 'item_id',
  //   textField: 'item_text',
  //   selectAllText: 'Select All',
  //   unSelectAllText: 'UnSelect All',
  //   itemsShowLimit: 5,
  //   allowSearchFilter: true
  // };


  
  this.employeeService.getViewEmployee().subscribe(
    (employeelist) => {
      this.employeearray = employeelist;
      console.log(employeelist);
      this.employeecountarray = employeelist;


this.employeecountarray = this.employeecountarray.filter((employee) => employee.companyName === this.userDetails.companyName);
console.log("count array");

console.log(this.employeecountarray);
    });
    
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'email',
      textField: 'fullName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
      
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  Submit() {
    console.log("hello");

    var values = 
      {
        projectName: this.addProject.get('projectName').value,
        projectDesc: this.addProject.get('projectDesc').value,
        reportingManager: this.addProject.get('reportingManager').value,
        projectEmployee: this.addProject.get('projectEmployee').value,
        companyName: this.addProject.get('companyName').value

      };
    
    console.log(values);

    this.projectService.postProject(values).subscribe({
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
    this.addProject.reset();
}
}
