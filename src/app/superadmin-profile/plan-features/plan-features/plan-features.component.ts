import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { FeatureService } from 'src/app/shared/feature.service';
import { PlanService } from 'src/app/shared/plan.service';
import { SuperadminService } from 'src/app/shared/superadmin.service';

@Component({
  selector: 'app-plan-features',
  templateUrl: './plan-features.component.html',
  styleUrls: ['./plan-features.component.css']
})
export class PlanFeaturesComponent implements OnInit {

  showSucessMessage: boolean;
  featurearray: any = [];
  getFeatures: any = [];

  serverErrorMessages: string;
  addfeature = new FormGroup({
    planName: new FormControl(''),
    planFeature: new FormControl(''),
    planFeatureName: new FormControl(''),
    planFeatureIcon: new FormControl('')

  })

  constructor(public featureService: FeatureService,public planService: PlanService, private router: Router) { 
  
  }

  ngOnInit() {

this.ViewFeatures();

  }


  Submit() {

    var values = 
      {
        planName: this.addfeature.get('planName').value,
        planFeature: this.addfeature.get('planFeature').value,
        planFeatureName: this.addfeature.get('planFeatureName').value,
        planFeatureIcon: this.addfeature.get('planFeatureIcon').value


        
      };
    
    console.log(values);

    this.featureService.postFeature(values).subscribe({
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
    this.addfeature.controls['planFeature'].reset()
}

ViewFeatures(){
  this.planService.getViewPlans().subscribe(
   response=>{
    console.log("reponse array");
    console.log(response);
    this.featurearray = response;
    this.featurearray=  this.featurearray;
    console.log("reponse array");
    console.log(this.featurearray);
  
    console.log("Final array");
    this.getFeatures = this.featurearray.map(data => data.planName); 
    console.log(this.getFeatures);
       
  }      
      )
    }

}
