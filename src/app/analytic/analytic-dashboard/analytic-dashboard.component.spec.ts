import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticDashboardComponent } from './analytic-dashboard.component';

describe('AnalyticDashboardComponent', () => {
  let component: AnalyticDashboardComponent;
  let fixture: ComponentFixture<AnalyticDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticDashboardComponent]
    });
    fixture = TestBed.createComponent(AnalyticDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
