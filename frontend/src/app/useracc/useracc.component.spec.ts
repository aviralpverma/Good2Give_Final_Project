import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraccComponent } from './useracc.component';

describe('UseraccComponent', () => {
  let component: UseraccComponent;
  let fixture: ComponentFixture<UseraccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseraccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
