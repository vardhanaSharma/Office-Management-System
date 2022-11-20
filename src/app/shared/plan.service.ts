import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Plan } from './plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  selectedPlan: Plan = {
    planName: '',
    price: '',
    minEmployee: '',
    maxEmployee: '',
    features:''
  };
  constructor(private http: HttpClient) { }

  postPlan(plan: Plan){
    return this.http.post(environment.apiBaseUrl+'/planregister',plan);
  }

  getViewPlans() {
    return this.http.get(environment.apiBaseUrl + '/plans');
  }
}
