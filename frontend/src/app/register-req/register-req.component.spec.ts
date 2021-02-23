import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterReqComponent } from './register-req.component';

describe('RegisterReqComponent', () => {
  let component: RegisterReqComponent;
  let fixture: ComponentFixture<RegisterReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterReqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
