import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrgDetailsComponent } from './admin-org-details.component';

describe('AdminOrgDetailsComponent', () => {
  let component: AdminOrgDetailsComponent;
  let fixture: ComponentFixture<AdminOrgDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrgDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrgDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
