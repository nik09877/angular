import { TestBed } from '@angular/core/testing';

import { LokiService } from './loki.service';

describe('LokiService', () => {
  let service: LokiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LokiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
