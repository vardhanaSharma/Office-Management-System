import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNotificationComponent } from './my-notification.component';

describe('MyNotificationComponent', () => {
  let component: MyNotificationComponent;
  let fixture: ComponentFixture<MyNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
