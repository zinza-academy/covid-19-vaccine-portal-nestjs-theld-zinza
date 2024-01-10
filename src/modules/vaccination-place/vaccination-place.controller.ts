import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { VaccinationPlaceService } from './vaccination-place.service';
import { CreateVaccinationPlaceDto } from './dto/create-vaccination-place.dto';
import { UpdateVaccinationPlaceDto } from './dto/update-vaccination-place.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

export interface vaccinationPlaceSearchParams {
  page: number;
  limit: number;
  name?: string;
  address?: string;
}

@UseGuards(JwtAuthGuard)
@Controller('vaccination-place')
export class VaccinationPlaceController {
  constructor(
    private readonly vaccinationPlaceService: VaccinationPlaceService,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createVaccinationPlaceDto: CreateVaccinationPlaceDto) {
    return this.vaccinationPlaceService.create(createVaccinationPlaceDto);
  }

  @Get()
  findAll(@Query() params: vaccinationPlaceSearchParams) {
    return this.vaccinationPlaceService.paginate(params);
  }

  @Get('all')
  getAll() {
    return this.vaccinationPlaceService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccinationPlaceService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() updateVaccinationPlaceDto: UpdateVaccinationPlaceDto,
  ) {
    return this.vaccinationPlaceService.update(+id, updateVaccinationPlaceDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.vaccinationPlaceService.remove(+id);
  }
}
