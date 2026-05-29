import { TestBed } from '@angular/core/testing';

import { Ramschema } from './ramschema';

describe('Ramschema', () => {
  let service: Ramschema;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ramschema);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
