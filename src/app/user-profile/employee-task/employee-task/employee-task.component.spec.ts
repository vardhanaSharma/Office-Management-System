import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTaskComponent } from './employee-task.component';

describe('EmployeeTaskComponent', () => {
  let component: EmployeeTaskComponent;
  let fixture: ComponentFixture<EmployeeTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
