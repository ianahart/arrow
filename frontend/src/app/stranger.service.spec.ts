import { TestBed } from '@angular/core/testing';

import { StrangerService } from './stranger.service';

describe('StrangerService', () => {
  let service: StrangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
