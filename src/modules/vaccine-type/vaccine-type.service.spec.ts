import { Test, TestingModule } from '@nestjs/testing';
import { VaccineTypeService } from './vaccine-type.service';

describe('VaccineTypeService', () => {
  let service: VaccineTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccineTypeService],
    }).compile();

    service = module.get<VaccineTypeService>(VaccineTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
