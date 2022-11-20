import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { UserService } from '../../shared/user.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  paymentHandler: any = null;
 
  success: boolean = false
  
  failure:boolean = false

  companyarray: any = [];
  planarray: any = [];
  getplan: any=[];

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  steps: any = 1;
  multistep = new FormGroup({
    mainDetails: new FormGroup({
      fullName: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    }),
    companyDetails: new FormGroup({
      companyName: new FormControl('',Validators.required),
      companyUrl: new FormControl('',Validators.required),
      plan: new FormControl('',Validators.required),
      maxEmployees: new FormControl('',Validators.required),
    })
  })
  constructor(public userService: UserService) { 
  }

  ngOnInit() {
    this.invokeStripe();
    this.ViewPlans();
   
  }

  Submit() {
    // console.log("hello");
    // console.log(this.multistep.value);
    this.steps = this.steps + 1;
    // console.log("hello1");
    // console.log(this.multistep.controls['mainDetails'].value.fullName);
    // console.log(this.multistep.controls['companyDetails'].value.companyName);

    // jsonObject: JSON;

    var eachProduct = 
      {
        fullName: this.multistep.controls['mainDetails'].value.fullName,
        email: this.multistep.controls['mainDetails'].value.email,
        password: this.multistep.controls['mainDetails'].value.password,
        companyName: this.multistep.controls['companyDetails'].value.companyName,
        companyUrl: this.multistep.controls['companyDetails'].value.companyUrl,
        plan: this.multistep.controls['companyDetails'].value.plan,
        maxEmployees: this.multistep.controls['companyDetails'].value.maxEmployees

      };

    
  
console.log("find json below")
    console.log(eachProduct);
if(this.steps==3){

  // if(this.data.data === "success")
  console.log("3 step");
    this.userService.postUser(eachProduct).subscribe({
      next: res => {
        this.showSucessMessage = true;
        // setTimeout(() => this.showSucessMessage = false, 4000);
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


  }


  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LH4kySFJqTVdSyc2HSgWd4tW2TNf8jnvdsd4U5stHfV3un557XMv6AoMU1lW38ZeGdmmpeouFdBy5FBBc0LQXEn009n99ClZx',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentstripe(stripeToken);
      },
    });
    
    const paymentstripe = (stripeToken: any) => {
      this.userService.makePayment(stripeToken).subscribe((data: any) => {
        console.log(data);
        if (data.data === "success") {
          this.success = true
        }
        else {
          this.failure = true
        }
      });
    };
 
    paymentHandler.open({
      name: 'Employee Management System',
      description: 'Please pay for the choosen plan',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51LH4kySFJqTVdSyc2HSgWd4tW2TNf8jnvdsd4U5stHfV3un557XMv6AoMU1lW38ZeGdmmpeouFdBy5FBBc0LQXEn009n99ClZx',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
 
      window.document.body.appendChild(script);
    }
  }

  
  autoFill1(v1){
   this.multistep.controls['companyDetails'].get("plan").setValue(v1);

}
autoFillmax(v2){
  this.multistep.controls['companyDetails'].get("maxEmployees").setValue(v2);

}

ViewPlans(){
  this.userService.getViewPlans().subscribe(
response=>{
console.log("reponse array");
console.log(response);
this.planarray = response;
this.planarray=  this.planarray;
console.log("reponse array");
console.log(this.planarray);

console.log("Final array");
this.getplan = this.planarray.map(data => data.planName); 
console.log(this.getplan);
console.log("PlanNave value");

console.log(this.planarray.planName)
   
}      
  )
}

}

