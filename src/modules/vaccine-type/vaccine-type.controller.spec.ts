import { Test, TestingModule } from '@nestjs/testing';
import { VaccineTypeController } from './vaccine-type.controller';
import { VaccineTypeService } from './vaccine-type.service';

describe('VaccineTypeController', () => {
  let controller: VaccineTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccineTypeController],
      providers: [VaccineTypeService],
    }).compile();

    controller = module.get<VaccineTypeController>(VaccineTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
