import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { PlanService } from 'src/app/shared/plan.service';
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  showSucessMessage: boolean;
  
  serverErrorMessages: string;
  addPlan = new FormGroup({
    planName: new FormControl(''),
    minEmployee: new FormControl(''),
    maxEmployee: new FormControl(''),
    price: new FormControl(''),
    features: new FormControl('')

  })
  constructor(public planService: PlanService, private router: Router) { 
   
  }

  ngOnInit(): void {
  }

  
  Submit() {

    var values = 
      {
        planName: this.addPlan.get('planName').value,
        price: this.addPlan.get('price').value,
        minEmployee: this.addPlan.get('minEmployee').value,
        maxEmployee: this.addPlan.get('maxEmployee').value,
        features: this.addPlan.get('features').value

        
      };
    
    console.log(values);

    this.planService.postPlan(values).subscribe({
      next: res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm();
      },
      error: err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    });
  }

  resetForm() {
    this.addPlan.reset();
}

}

