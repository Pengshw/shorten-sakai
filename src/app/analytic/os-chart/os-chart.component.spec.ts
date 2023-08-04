import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsChartComponent } from './os-chart.component';

describe('OsChartComponent', () => {
  let component: OsChartComponent;
  let fixture: ComponentFixture<OsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OsChartComponent]
    });
    fixture = TestBed.createComponent(OsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
