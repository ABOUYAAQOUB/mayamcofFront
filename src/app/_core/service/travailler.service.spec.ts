import { TestBed } from '@angular/core/testing';

import { TravaillerService } from './travailler.service';

describe('TravaillerService', () => {
  let service: TravaillerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravaillerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
