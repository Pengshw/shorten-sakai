import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserChartComponent } from './browser-chart.component';

describe('BrowserChartComponent', () => {
  let component: BrowserChartComponent;
  let fixture: ComponentFixture<BrowserChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserChartComponent]
    });
    fixture = TestBed.createComponent(BrowserChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
