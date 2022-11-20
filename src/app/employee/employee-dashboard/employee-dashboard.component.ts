import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  userDetails;
  panelOpenState = false;
  isExpanded: boolean = true;
 
  employeedata: any;
  employeepassword: any;
  employeeemail: any;
  employeename: any;
  employeecurrentSalary: any;
  employeephone: any;
  employeelastCompany: any;
  employeejoiningDate: any;
  employeecompanyName: any;
  constructor(private userService: UserService, private employeeService: EmployeeService, private router: ActivatedRoute) { }


  ngOnInit(): void {
    // this.employeeService.getEmployeeData((this.router.snapshot.params._id))
    // .subscribe({
    //   next:(res)=>{
    //     console.log("Helloo")
    //     console.log(res);
    //     this.profilearray = res;
    //   },
    //   error:()=>{
    //     alert("error!!!")
    //   }
    // })

    this.employeeService.getEmployeeByEmail((this.router.snapshot.params.email)).subscribe(
      // (result: any)=>{
      
      //   this.employeedata = result;
      //   console.log(this.employeedata,"data");
      // }

      {
        next:(res)=>{
          console.log(res);
          this.employeedata = res;
          // console.log("values"+ this.employeedata.fullName.value)
          this.employeeemail = this.employeedata.map(data => data.email); 
          console.log("hello values");
          
          console.log(this.employeeemail);
          this.viewEmployee(this.employeeemail);
        
        },
        error:()=>{
          alert("error!!!")
        }
      }   
        );

       


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

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }


}
