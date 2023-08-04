import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlformComponent } from './urlform.component';

describe('UrlformComponent', () => {
  let component: UrlformComponent;
  let fixture: ComponentFixture<UrlformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrlformComponent]
    });
    fixture = TestBed.createComponent(UrlformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
