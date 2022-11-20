import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-superadmin-profile',
  templateUrl: './superadmin-profile.component.html',
  styleUrls: ['./superadmin-profile.component.css']
})
export class SuperadminProfileComponent implements OnInit {
  panelOpenState = false;
  isExpanded: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
