import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Feature } from './feature.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  selectedFeature: Feature = {
    planName: '',
    planFeature: '',
    planFeatureName: '',
    planFeatureIcon: ''

  };

  constructor(private http: HttpClient) { }

  postFeature(feature: Feature){
    return this.http.post(environment.apiBaseUrl+'/featureregister',feature);
  }
  

  getViewFeature() {
    return this.http.get(environment.apiBaseUrl + '/features');
  }
}
