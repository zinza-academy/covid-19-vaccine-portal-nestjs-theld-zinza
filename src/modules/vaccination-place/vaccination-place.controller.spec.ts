import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationPlaceController } from './vaccination-place.controller';
import { VaccinationPlaceService } from './vaccination-place.service';

describe('VaccinationPlaceController', () => {
  let controller: VaccinationPlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinationPlaceController],
      providers: [VaccinationPlaceService],
    }).compile();

    controller = module.get<VaccinationPlaceController>(VaccinationPlaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
