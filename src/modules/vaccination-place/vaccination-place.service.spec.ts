import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationPlaceService } from './vaccination-place.service';

describe('VaccinationPlaceService', () => {
  let service: VaccinationPlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccinationPlaceService],
    }).compile();

    service = module.get<VaccinationPlaceService>(VaccinationPlaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
