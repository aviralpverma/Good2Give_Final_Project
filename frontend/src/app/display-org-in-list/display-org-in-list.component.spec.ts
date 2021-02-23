import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOrgInListComponent } from './display-org-in-list.component';

describe('DisplayOrgInListComponent', () => {
  let component: DisplayOrgInListComponent;
  let fixture: ComponentFixture<DisplayOrgInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayOrgInListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOrgInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
