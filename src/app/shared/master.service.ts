import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Master } from './master.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  selectedMaster: Master = {
    masterName: '',
    companyName: ''
  };

  constructor(private http: HttpClient) { }

  postMaster(master: Master){
    return this.http.post(environment.apiBaseUrl+'/masterregister',master);
  }
  

  getViewMaster() {
    return this.http.get(environment.apiBaseUrl + '/masters');
  }
  
}
