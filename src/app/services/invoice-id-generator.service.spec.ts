import { TestBed } from '@angular/core/testing';

import { InvoiceIdGeneratorService } from './invoice-id-generator.service';

describe('InvoiceIdGeneratorService', () => {
  let service: InvoiceIdGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceIdGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
