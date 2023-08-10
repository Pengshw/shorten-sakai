import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionDashboardComponent } from './permission-dashboard.component';

describe('PermissionDashboardComponent', () => {
  let component: PermissionDashboardComponent;
  let fixture: ComponentFixture<PermissionDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermissionDashboardComponent]
    });
    fixture = TestBed.createComponent(PermissionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
