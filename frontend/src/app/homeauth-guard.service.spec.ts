import { TestBed } from '@angular/core/testing';

import { HomeauthGuardService } from './homeauth-guard.service';

describe('HomeauthGuardService', () => {
  let service: HomeauthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeauthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
