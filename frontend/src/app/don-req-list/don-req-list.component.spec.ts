import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonReqListComponent } from './don-req-list.component';

describe('DonReqListComponent', () => {
  let component: DonReqListComponent;
  let fixture: ComponentFixture<DonReqListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonReqListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
