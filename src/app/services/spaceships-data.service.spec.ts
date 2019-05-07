import { TestBed } from '@angular/core/testing';
import { SpaceshipsDataService } from './spaceships-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('SpaceshipsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
  }));

  it('should be created', () => {
    const service: SpaceshipsDataService = TestBed.get(SpaceshipsDataService);
    expect(service).toBeTruthy();
  });
});
