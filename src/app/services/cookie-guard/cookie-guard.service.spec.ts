import { TestBed } from '@angular/core/testing';

import { CookieGuardService } from './cookie-guard.service';

describe('CookieGuardService', () => {
  let service: CookieGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
