import { TestBed } from '@angular/core/testing';

import { CotactService } from './cotact.service';

describe('CotactService', () => {
  let service: CotactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
