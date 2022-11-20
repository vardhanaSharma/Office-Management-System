import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanFeaturesComponent } from './plan-features.component';

describe('PlanFeaturesComponent', () => {
  let component: PlanFeaturesComponent;
  let fixture: ComponentFixture<PlanFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanFeaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
