import { TestBed } from '@angular/core/testing';

import { TokenManagementService } from './token-management.service';

describe('TokenManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenManagementService = TestBed.get(TokenManagementService);
    expect(service).toBeTruthy();
  });
});
