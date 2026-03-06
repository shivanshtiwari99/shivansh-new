import { TestBed } from '@angular/core/testing';

import { Adminservices } from './adminservices';

describe('Adminservices', () => {
  let service: Adminservices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Adminservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
