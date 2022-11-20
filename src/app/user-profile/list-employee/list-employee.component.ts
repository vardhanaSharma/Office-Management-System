import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from 'src/app/shared/employee.service';
import { UserService } from 'src/app/shared/user.service';

import { Pipe, PipeTransform } from '@angular/core';
// import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})


export class ListEmployeeComponent implements OnInit {
  employeelist;
  userDetails;
  employeearray: any = [];
  employeecountarray: any = [];
  lengthhh;

  FilterText = '';
  todayDate : Date = new Date();
  color = 'primary';
  checked = false;
  disabled = false;

  displayedColumns: string[] = ['fullName', 'email', 'phone', 'masters','companyName','joiningDate', 'currentSalary', 'action', 'status'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  @ViewChild(MatSort) matSort: MatSort;


  

  constructor(private employeeService: EmployeeService,private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.employeeService.getViewEmployee().subscribe(
      (employeelist) => {
        this.employeearray = employeelist;
        console.log(employeelist);
        this.employeecountarray = employeelist;
        
        // this.dataSource = new MatTableDataSource<any>(this.employeearray)

        // this.dataSource = new MatTableDataSource<any>(this.employeearray.filter(({ companyName }) =>
        // companyName === 'samsung'))

this.employeecountarray = this.employeecountarray.filter((employee) => employee.companyName === this.userDetails.companyName);
console.log("count array");

console.log(this.employeecountarray);
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
      // this.dataSource.filter=this.FilterText.trim().toLowerCase();
      this.dataSource.filter=this.FilterText.trim().toLowerCase();

  }


  deleteEmployee(_id:any){
    alert("id  "+ _id);
    this.employeeService.delete(_id)
    .subscribe({
      next:(res)=>{
        alert("deleted successfully"+res)
      },
      error:()=>{
        alert("error!!!")
      }
    })
  }

    viewEmployee(_id:any){

      // this.router.navigate(['/employeeprofile']);

      this.employeeService.getIndivisualEmployee(_id)
    .subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:()=>{
        alert("error!!!")
      }
    })
    }



  }



