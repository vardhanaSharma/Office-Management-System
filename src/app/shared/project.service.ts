import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  selectedProject: Project = {
    projectName: '',
    projectDesc: '',
    reportingManager: '',
    projectEmployee: '',
    companyName: ''
  };
  constructor(private http: HttpClient) { }

  postProject(project: Project){
    return this.http.post(environment.apiBaseUrl+'/projectregister',project);
  }

  getViewProject() {
    return this.http.get(environment.apiBaseUrl + '/projects');
  }

}