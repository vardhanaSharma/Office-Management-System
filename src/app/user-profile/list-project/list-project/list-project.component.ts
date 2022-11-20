import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ProjectService } from 'src/app/shared/project.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {
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
  projectlist;
  getProjects: any = [];
  getSelectddProjectList: any = [];
  array: any = [];
  getReportingManager: any=[];
  projectarray: any = [];
  projectcountarray: any = [];
  

  FilterText = '';
  todayDate : Date = new Date();
  color = 'primary';
  checked = false;
  disabled = false;

  displayedColumns: string[] = ['projectName', 'projectDesc', 'reportingManager', 'projectEmployee'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  @ViewChild(MatSort) matSort: MatSort;


  

  constructor(private employeeService: EmployeeService,private userService: UserService,private projectService: ProjectService, private router: Router) { }
  ngOnInit(): void {
    this.projectService.getViewProject().subscribe(
      (projectlist) => {
        this.projectarray = projectlist;
        console.log(projectlist);
        this.projectcountarray = projectlist;

this.projectcountarray = this.projectcountarray.filter((employee) => employee.companyName === this.userDetails.companyName);
console.log("count array");

console.log(this.projectcountarray);

      }
    )


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
    
this.lengthhh = Object.keys(this.getProjects).length;
console.log(this.lengthhh);
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

  }



