import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ProjectService } from 'src/app/shared/project.service';
import { TaskService } from 'src/app/shared/task.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-employee-task',
  templateUrl: './employee-task.component.html',
  styleUrls: ['./employee-task.component.css']
})
export class EmployeeTaskComponent implements OnInit {

  showSucessMessage: boolean;
  getProjects: any = [];
  getSelectddProjectList: any = [];
  array: any = [];
  getReportingManager: any=[];

  addTask = new FormGroup({
    projectName: new FormControl(''),
    taskName: new FormControl(''),
    reportingManager: new FormControl(''),
    employeeName: new FormControl(''),
    employeeEmail: new FormControl(''),
    status: new FormControl(''),
    companyName: new FormControl('')

  })
  userDetails;
  employeelist;
  employeearray: any = [];
  employeecountarray: any = [];
  serverErrorMessages: any;
  lengthhh: number;
  selectedproject: void;
  getReportingManagerName: any;
  getReportingManagerName1: any;
  getReportingManagerName2: any;
  getEmployee: any;
  getEmployeeName: any;
  selectedEmp: any;
  getSelectdEmployeeEmail: any;
  getSelectdEmployeeName: any;
  getSelectdEmployeeData: any;
  getSelectdEmployeeEmailOutOfArray: any;
 
  constructor(public employeeService: EmployeeService,public taskService: TaskService, public projectService: ProjectService, private userService: UserService, private router: Router) { 
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
  
  this.employeeService.getViewEmployee().subscribe(
    (employeelist) => {
      this.employeearray = employeelist;
      console.log(employeelist);
      this.employeecountarray = employeelist;


this.employeecountarray = this.employeecountarray.filter((employee) => employee.companyName === this.userDetails.companyName);
console.log("count array");

console.log(this.employeecountarray);
    });
    
    this.ViewProjects();

  }


  Submit() {
    console.log("hello");

    var values = 
      {
        projectName: this.addTask.get('projectName').value,
        taskName: this.addTask.get('taskName').value,
        reportingManager: this.addTask.get('reportingManager').value,
        employeeName: this.addTask.get('employeeName').value,
        employeeEmail: this.addTask.get('employeeEmail').value,
        status: this.addTask.get('status').value,
        companyName: this.addTask.get('companyName').value

      };
    
    console.log(values);

    this.taskService.postTask(values).subscribe({
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
    this.addTask.reset();
}


ViewProjects(){
  this.projectService.getViewProject().subscribe(
   response=>{
    console.log("reponse array");
    console.log(response);
    this.array = response;
    this.array=  this.array;
    console.log("reponse array");
    console.log(this.array);
  
    console.log("Final array");
    this.getProjects = this.array.map(data => data.projectName); 
    console.log(this.getProjects);
       
  }      
      )
    }

  onChange(getProjects : any) {
    this.selectedproject =getProjects.target.value;
    console.log("selectedproject: "+ this.selectedproject);
    this.getSelectddProjectList = this.array.filter((rm) => rm.projectName === this.selectedproject);
    console.log("report list");
    console.log(this.getSelectddProjectList);
    this.getReportingManager = this.getSelectddProjectList.map(data => data.reportingManager);
    console.log("rm");
    console.log(this.getReportingManager);
   
    this.getReportingManagerName = this.getReportingManager[0];
    console.log("repname");
    console.log(this.getReportingManagerName);

    // this.getReportingManagerName1 = this.getReportingManagerName[0];
    // console.log("name1");
    // console.log(this.getReportingManagerName1);

    // this.getReportingManagerName2 = this.getReportingManagerName1.fullName;
    // console.log("name2");
    // console.log(this.getReportingManagerName2);
 }

 onChange1(getProjects : any) {
  this.selectedproject =getProjects.target.value;
  console.log("selectedproject: "+ this.selectedproject);
  this.getSelectddProjectList = this.array.filter((rm) => rm.projectName === this.selectedproject);
  console.log("report list");
  console.log(this.getSelectddProjectList);
  this.getEmployee = this.getSelectddProjectList.map(data => data.projectEmployee);
    console.log("emp");
    console.log(this.getEmployee);
    
    this.getEmployeeName = this.getEmployee[0];
    console.log("empname");
    console.log(this.getEmployeeName);

}

onChange2(getTargetEmployee : any) {
  this.selectedEmp =getTargetEmployee.target.value;
  console.log("selectedEmp: "+ this.selectedEmp);
   this.getSelectdEmployeeData = this.employeecountarray.filter((emp) => emp.fullName === this.selectedEmp);
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
