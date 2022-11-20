import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  profilearray: any = [];

  constructor(private employeeService: EmployeeService,private userService: UserService, private router: ActivatedRoute) { }

  ngOnInit(): void {
      this.employeeService.getIndivisualEmployee((this.router.snapshot.params._id))
      .subscribe({
        next:(res)=>{
          console.log(res);
          this.profilearray = res;
        },
        error:()=>{
          alert("error!!!")
        }
      })
  }

  viewEmployee(_id:any){

    this.employeeService.getIndivisualEmployee(_id)
  .subscribe({
    next:(res)=>{
      console.log(res);
      this.profilearray = res;
    },
    error:()=>{
      alert("error!!!")
    }
  })
  }

}
function _id(_id: any) {
  throw new Error('Function not implemented.');
}

