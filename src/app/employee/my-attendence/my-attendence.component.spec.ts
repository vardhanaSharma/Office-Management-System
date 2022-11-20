import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAttendenceComponent } from './my-attendence.component';

describe('MyAttendenceComponent', () => {
  let component: MyAttendenceComponent;
  let fixture: ComponentFixture<MyAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAttendenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
