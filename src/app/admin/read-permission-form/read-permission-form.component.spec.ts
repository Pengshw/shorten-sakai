import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadPermissionFormComponent } from './read-permission-form.component';

describe('ReadPermissionFormComponent', () => {
  let component: ReadPermissionFormComponent;
  let fixture: ComponentFixture<ReadPermissionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadPermissionFormComponent]
    });
    fixture = TestBed.createComponent(ReadPermissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
