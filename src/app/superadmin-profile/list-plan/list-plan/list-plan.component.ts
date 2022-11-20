import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PlanService } from 'src/app/shared/plan.service';

@Component({
  selector: 'app-list-plan',
  templateUrl: './list-plan.component.html',
  styleUrls: ['./list-plan.component.css']
})
export class ListPlanComponent implements OnInit {
  planlist;
  userDetails;
  planarray: any = [];
  FilterText = '';

  displayedColumns: string[] = ['planName', 'price', 'features', 'maxEmployee', 'minEmployee'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  @ViewChild(MatSort) matSort: MatSort;

  

  constructor(private planService: PlanService, private router: Router) { }
  ngOnInit(): void {
    this.planService.getViewPlans().subscribe(
      (planlist) => {
        this.planarray = planlist;
        this.dataSource = new MatTableDataSource<any>(this.planarray)

        console.log(this.planarray);
        
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }

        if (this.matSort) {
          this.dataSource.sort = this.matSort;
        }

      }
    )

  }


  filterData(){
      // this.dataSource.filter=this.FilterText.trim().toLowerCase();
      this.dataSource.filter=this.FilterText.trim().toLowerCase();

  }
}

