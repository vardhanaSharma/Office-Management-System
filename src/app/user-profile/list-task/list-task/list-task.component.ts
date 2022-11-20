import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from 'src/app/shared/employee.service';
import { TaskService } from 'src/app/shared/task.service';
import { UserService } from 'src/app/shared/user.service';
import { tap } from 'rxjs';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
 
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
  
  displayedColumns: string[] = ['projectName', 'taskName', 'reportingManager', 'employeeName','employeeEmail','status'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  @ViewChild(MatSort) matSort: MatSort;
  
  constructor(private employeeService: EmployeeService,private notificationService: NotificationService,private taskService: TaskService,private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.taskService.getViewTask().subscribe(
      (tasklist) => {
        this.taskarray = tasklist;
        console.log("task");
        
        console.log(tasklist);
        this.taskcountarray = tasklist;

this.taskcountarray = this.taskcountarray.filter((task) => task.companyName === this.userDetails.companyName);
console.log("count array");

console.log(this.taskcountarray);
console.log("lenth== "+Object.keys(this.taskcountarray).length);
this.lengthhh = Object.keys(this.taskcountarray).length;
console.log(this.lengthhh);




        this.dataSource = new MatTableDataSource<any>(this.taskarray.filter((employee) => employee.companyName === this.userDetails.companyName))

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


  filterData(){
      // this.dataSource.filter=this.FilterText.trim().toLowerCase();
      this.dataSource.filter=this.FilterText.trim().toLowerCase();

  }

  }



