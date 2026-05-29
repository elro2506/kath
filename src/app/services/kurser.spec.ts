import { TestBed } from '@angular/core/testing';

import { Kurser } from './kurser';

describe('Kurser', () => {
  let service: Kurser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Kurser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
