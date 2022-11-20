import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestnotificationComponent } from './requestnotification.component';

describe('RequestnotificationComponent', () => {
  let component: RequestnotificationComponent;
  let fixture: ComponentFixture<RequestnotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestnotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
