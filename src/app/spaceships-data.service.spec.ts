import { TestBed } from '@angular/core/testing';

import { SpaceshipsDataService } from './spaceships-data.service';

describe('SpaceshipsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpaceshipsDataService = TestBed.get(SpaceshipsDataService);
    expect(service).toBeTruthy();
  });
});
