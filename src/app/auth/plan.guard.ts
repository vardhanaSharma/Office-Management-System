import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class PlanGuard implements CanActivate {
  
  currentPlan;


  constructor(private userService : UserService,private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.userService.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        this.userService.deleteToken();
        return false;
      }else{

        this.currentPlan = this.userService.getPlanByToken(this.userService.getToken());
        // console.log(next.url[0].path);

        if(this.currentPlan){

        }
        this.userService.haveAccess(this.currentPlan,next.url[0].path).subscribe(result=>{
          console.log(result);
          
        })
        return true;


      }

  }
  
}
