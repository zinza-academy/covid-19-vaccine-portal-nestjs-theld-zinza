import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VaccinationRegistrationService } from './vaccination-registration.service';
import { CreateVaccinationRegistrationDto } from './dto/create-vaccination-registration.dto';
import { UpdateVaccinationRegistrationDto } from './dto/update-vaccination-registration.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/entities/user.entity';
import { AdminGuard } from 'src/guards/admin.guard';

export interface vaccinationRegistrationSearchParams {
  page: number;
  limit: number;
  name?: string;
  citizenCode?: string;
}

@Controller('vaccination-registration')
@UseGuards(JwtAuthGuard)
export class VaccinationRegistrationController {
  constructor(
    private readonly vaccinationRegistrationService: VaccinationRegistrationService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(
    @Body() data: CreateVaccinationRegistrationDto,
    @CurrentUser() user: User,
  ) {
    data.userId = user.id;

    return this.vaccinationRegistrationService.create(data);
  }

  @Get()
  findAll(
    @Query() params: vaccinationRegistrationSearchParams,
    @CurrentUser() user: User,
  ) {
    return this.vaccinationRegistrationService.findAll(params, +user.id);
  }

  @Get('for-admin')
  @UseGuards(AdminGuard)
  findAllForAdmin(@Query() params: vaccinationRegistrationSearchParams) {
    return this.vaccinationRegistrationService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccinationRegistrationService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() data: UpdateVaccinationRegistrationDto,
  ) {
    return this.vaccinationRegistrationService.update(+id, data);
  }
}
