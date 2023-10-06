import { TestBed } from '@angular/core/testing';

import { DetailcommandeService } from './detailcommande.service';

describe('DetailcommandeService', () => {
  let service: DetailcommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailcommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
