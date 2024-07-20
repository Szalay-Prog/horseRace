import { TestBed } from '@angular/core/testing';

import { HorseStateService } from './horse-state.service';

describe('HorseStateService', () => {
  let service: HorseStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorseStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
