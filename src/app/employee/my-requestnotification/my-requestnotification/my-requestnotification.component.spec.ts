import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestnotificationComponent } from './my-requestnotification.component';

describe('MyRequestnotificationComponent', () => {
  let component: MyRequestnotificationComponent;
  let fixture: ComponentFixture<MyRequestnotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRequestnotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRequestnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
