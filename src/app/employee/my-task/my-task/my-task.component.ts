import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from "@angular/router";
import { AttendenceService } from 'src/app/shared/attendence.service';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MasterService } from 'src/app/shared/master.service';
import { TaskService } from 'src/app/shared/task.service';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
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

  showSucessMessage: boolean;
  tasklist;
  userDetails;
  taskarray: any = [];
  taskcountarray: any = [];
  lengthhh;

  FilterText = '';
  todayDate : Date = new Date();
  color = 'primary';
  checked = false;
  disabled = false;   
  
  displayedColumns: string[] = ['projectName', 'taskName', 'reportingManager','currentstatus','updatestatus'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  @ViewChild(MatSort) matSort: MatSort;

  constructor(public employeeService: EmployeeService, public taskService: TaskService,private masterService: MasterService, private userService: UserService,public attendenceService: AttendenceService, private router: ActivatedRoute) { 
  }

  ngOnInit(): void {
   
    this.employeeService.getEmployeeByEmail((this.router.snapshot.params.email)).subscribe(
      {
        next:(res)=>{
          console.log(res);
          this.employeedata = res;
          this.employeeemail = this.employeedata.map(data => data.email); 
          console.log("hello values");
          
          console.log(this.employeeemail);
          this.viewEmployee(this.employeeemail);
          this.employeecompanyName = this.employeedata.map(data => data.companyName); 
          console.log("hello name");
          
          console.log(this.employeecompanyName);
        },
        error:()=>{
          alert("error!!!")
        }
      }   
        );

     this.taskService.getViewTaskEmployeeByEmail((this.router.snapshot.params.email)).subscribe(
          (tasklist) => {
            this.taskarray = tasklist;
            console.log("task");
            console.log(tasklist);


            console.log("hello values");
          
          console.log(this.employeeemail);
          this.viewEmployee(this.employeeemail);
          console.log("hello values");
          console.log(this.employeecompanyName)
            this.taskcountarray = tasklist;
    
    this.taskcountarray = this.taskcountarray.filter((task) => task.companyName === this.employeecompanyName[0]);
    console.log("count array");
    console.log(this.taskcountarray);
    console.log("lenth== "+Object.keys(this.taskcountarray).length);
    this.lengthhh = Object.keys(this.taskcountarray).length;
    console.log(this.lengthhh);
    
  
    
    this.dataSource = new MatTableDataSource<any>(this.taskarray.filter((employee) => employee.companyName === this.employeecompanyName[0]))

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.matSort) {
      this.dataSource.sort = this.matSort;
    }
    
          }
        )
    

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

  filterData(){
    // this.dataSource.filter=this.FilterText.trim().toLowerCase();
    this.dataSource.filter=this.FilterText.trim().toLowerCase();

}
  }

  