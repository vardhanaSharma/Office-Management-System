import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../shared/user.service";


@Injectable({
  providedIn: 'root'
})
export class StandardGuard implements CanActivate {
  currentPlan;

  constructor(private userService : UserService,private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.userService.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        this.userService.deleteToken();
        return false;
      }
     this.currentPlan = this.userService.getPlanByToken(this.userService.getToken());
     if(this.currentPlan=='Premium Plan'){
      return true;
     }else{
      alert('This is not part of your plan');
      this.router.navigateByUrl('/');
      return false;
     }
  }
  
}
