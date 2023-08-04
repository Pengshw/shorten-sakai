import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlOverlayComponent } from './url-overlay.component';

describe('UrlOverlayComponent', () => {
  let component: UrlOverlayComponent;
  let fixture: ComponentFixture<UrlOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrlOverlayComponent]
    });
    fixture = TestBed.createComponent(UrlOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
