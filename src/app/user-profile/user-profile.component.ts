import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs';
import { NotificationService } from 'src/app/shared/notification.service';
import { UserService } from '../shared/user.service';
import { EmployeeService } from '../shared/employee.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
 
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  userDetails;
  panelOpenState = false;
  isExpanded: boolean = true;

  displaymenu1=false;
  displaymenu2=false;
  displaymenu3=false;
  currentPlan:any;
  menulist$: any;

  constructor(private userService: UserService, private employeeService: EmployeeService, private router: Router,private notificationService: NotificationService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe({
     next: res => {
        this.userDetails = res['user'];
      },
     error:  err => { 
        console.log(err);
        
      }
  });

  this.userService.UpdateMenu.subscribe(res=>{
    this.menuDisplay();
    this.LoadMenu();

  })
  this.menuDisplay();
  this.LoadMenu();

  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  onAddEmployee(){
    console.log("add employee");
    
    this.router.navigate(['/addempoyee']);
  }

  onViewEmployee(){
    // console.log("add employee");
    
    this.router.navigate(['/employees']);
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }


  menuDisplay(){
    if(this.userService.getToken()!=''){
    this.currentPlan=this.userService.getPlanByToken(this.userService.getToken())
    this.displaymenu1 = this.currentPlan=='Premium Plan'
    this.displaymenu2 = (this.currentPlan=='Premium Plan' || this.currentPlan=='Standard Plan')

}
  }
  LoadMenu(){
    if(this.userService.getToken()!=''){
      this.currentPlan=this.userService.getPlanByToken(this.userService.getToken())
      this.userService.getMenuByPlan(this.currentPlan).subscribe(result=>{
      this.menulist$ = result;
      console.log(result);
      
     })
    }
  }
}