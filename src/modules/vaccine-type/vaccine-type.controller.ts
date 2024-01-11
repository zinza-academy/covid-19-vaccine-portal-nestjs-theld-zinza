import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { VaccineTypeService } from './vaccine-type.service';
import { CreateVaccineTypeDto } from './dto/create-vaccine-type.dto';
import { UpdateVaccineTypeDto } from './dto/update-vaccine-type.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

export interface vaccineTypeSearchParams {
  page: number;
  limit: number;
}

@UseGuards(JwtAuthGuard)
@Controller('vaccine-type')
export class VaccineTypeController {
  constructor(private readonly vaccineTypeService: VaccineTypeService) {}

  @Post()
  @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createVaccineTypeDto: CreateVaccineTypeDto) {
    return this.vaccineTypeService.create(createVaccineTypeDto);
  }

  @Get()
  findAll(@Query() params: vaccineTypeSearchParams) {
    return this.vaccineTypeService.paginate(params);
  }

  @Get('all')
  getAll() {
    return this.vaccineTypeService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccineTypeService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() updateVaccineTypeDto: UpdateVaccineTypeDto,
  ) {
    return this.vaccineTypeService.update(+id, updateVaccineTypeDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.vaccineTypeService.remove(+id);
  }
}
