import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from "@angular/router";
import { SuperadminService } from 'src/app/shared/superadmin.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  userlist;
  FilterText: '';
  userarray: any = [];

  
  displayedColumns: string[] = ['fullName', 'email', 'password','companyName','companyUrl', 'plan'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  @ViewChild(MatSort) matSort: MatSort;


  

  constructor(private superadminservice: SuperadminService, private router: Router) { }
  ngOnInit(): void {
    this.superadminservice.getViewUser().subscribe(
      (userlist) => {
        this.userarray = userlist;
        this.dataSource = new MatTableDataSource<any>(this.userarray)
        console.log(this.userarray);

        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }

        if (this.matSort) {
          this.dataSource.sort = this.matSort;
        }

      }
    )
  
    
    //  this.dataSource.filter=this.userDetails.companyName.trim().toLowerCase();
    

  }

  filterData(){
    // this.dataSource.filter=this.FilterText.trim().toLowerCase();
    this.dataSource.filter=this.FilterText.trim().toLowerCase();

}

}

