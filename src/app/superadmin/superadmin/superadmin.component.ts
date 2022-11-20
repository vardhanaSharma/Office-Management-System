import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SuperadminService } from 'src/app/shared/superadmin.service';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {
 showSucessMessage: boolean;
 serverErrorMessages: string;
 superadminlogin = new FormGroup({
   email: new FormControl(''),
   password: new FormControl('')
 })





 constructor(public superadmin: SuperadminService,private router: Router) { 

}

  ngOnInit(): void {
  }


  toSuperAdminProfile(){   
    // console.log("button clicked")
    
    if((this.superadminlogin.get('email').value) == "admin" && (this.superadminlogin.get('password').value) == "super"){
      this.router.navigate(['/superadminprofile']);
    }
   else{
    this.serverErrorMessages = 'Wrong Credentials.';
   }
  }

}
