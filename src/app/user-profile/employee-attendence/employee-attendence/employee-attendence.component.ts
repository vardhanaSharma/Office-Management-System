import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from "@angular/router";
import { AttendenceService } from 'src/app/shared/attendence.service';
import { EmployeeService } from 'src/app/shared/employee.service';
import { UserService } from 'src/app/shared/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-employee-attendence',
  templateUrl: './employee-attendence.component.html',
  styleUrls: ['./employee-attendence.component.css']
})
export class EmployeeAttendenceComponent implements OnInit {
  employeelist;
  userDetails;
  employeearray: any = [];
  employeecountarray: any = [];
  employeePresent: any = [];
  employeeAbsent: any = [];
  employeeLeave: any = [];
  apiResponse:any = [];
  lengthhh;
  panelOpenState = false;
  isExpanded: boolean = true;
 

  FilterText = '';
  todayDate : Date = new Date();
  color = 'primary';
  checked = false;
  disabled = false;

  displayedColumns: string[] = ['fullName', 'date', 'attendenceStatus'];
dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  @ViewChild(MatSort) matSort: MatSort;
  leave: number;
  present: number;
  absent: number;


  

  constructor(private employeeService: EmployeeService,private userService: UserService,public attendenceService: AttendenceService, private router: Router) { }
ngOnInit(): void {
    this.attendenceService.getViewEmployeeAttendence().subscribe(
      (employeelist) => {
        // this.apiResponse = employeelist;
        this.employeearray = employeelist;
        console.log("count array");
        console.log(employeelist);
        this.employeecountarray = employeelist;
       this.apiResponse = this.employeearray.filter((employee) => employee.companyName === this.userDetails.companyName);
       console.log("api array");
       console.log(this.apiResponse);
       
       

        
this.employeePresent=this.employeecountarray.filter((employee) => employee.companyName === this.userDetails.companyName && employee.attendenceStatus === 'p');
console.log(this.employeePresent);
console.log("present== "+Object.keys(this.employeePresent).length)
this.present = Object.keys(this.employeePresent).length;


this.employeeAbsent=this.employeecountarray.filter((employee) => employee.companyName === this.userDetails.companyName && employee.attendenceStatus === 'a');
console.log(this.employeeAbsent);
console.log("ansent== "+Object.keys(this.employeeAbsent).length)
this.absent = Object.keys(this.employeeAbsent).length;


this.employeeLeave=this.employeecountarray.filter((employee) => employee.companyName === this.userDetails.companyName && employee.attendenceStatus === 'l');
console.log(this.employeeLeave);
console.log("leave== "+Object.keys(this.employeeLeave).length)
this.leave = Object.keys(this.employeeLeave).length;

this.employeecountarray = this.employeecountarray.filter((employee) => employee.companyName === this.userDetails.companyName);
console.log("count array");

console.log(this.employeecountarray);
// this.apiResponse = this.employeecountarray;
console.log("lenth== "+Object.keys(this.employeecountarray).length);
this.lengthhh = Object.keys(this.employeecountarray).length;
console.log(this.lengthhh);


        this.dataSource = new MatTableDataSource<any>(this.employeearray.filter((employee) => employee.companyName === this.userDetails.companyName))

        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }

        if (this.matSort) {
          this.dataSource.sort = this.matSort;
        }

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
  
    //  this.dataSource.filter=this.userDetails.companyName.trim().toLowerCase();
    

  }

  
  backToProfile() {
    this.router.navigate(['/userprofile']);
  }

  filterData(){
      this.dataSource.filter=this.FilterText.trim().toLowerCase();
  }

onChange( $event : any ){
  console.log("status choosed");
    let filteredData = _.filter(this.apiResponse,(item) =>{
      return item.attendenceStatus.toLowerCase() ==  $event.value.toLowerCase(); 
    })
    this.dataSource = new MatTableDataSource(filteredData);
  }

  dateChange( $event : any ){
    console.log("date choosed");
    console.log($event.value);
    let filteredData = _.filter(this.apiResponse,(item) =>{
      console.log($event.value);
      return item.date ==  $event.value; 
    })
    this.dataSource = new MatTableDataSource(filteredData);
  }

  }


