import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminDashboardComponent } from './user-admin-dashboard.component';

describe('UserAdminDashboardComponent', () => {
  let component: UserAdminDashboardComponent;
  let fixture: ComponentFixture<UserAdminDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAdminDashboardComponent]
    });
    fixture = TestBed.createComponent(UserAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
