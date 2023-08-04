import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostVisitedGraphComponent } from './most-visited-graph.component';

describe('MostVisitedGraphComponent', () => {
  let component: MostVisitedGraphComponent;
  let fixture: ComponentFixture<MostVisitedGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostVisitedGraphComponent]
    });
    fixture = TestBed.createComponent(MostVisitedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
