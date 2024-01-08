import {
  Controller,
  Get,
  Param,
  UseGuards,
  Query,
  Put,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/user.entity';

export interface userSearchParams {
  page: number;
  limit: number;
  name?: string;
  citizenCode?: string;
}

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AdminGuard)
  findAll(@Query() params: userSearchParams) {
    return this.userService.findAll(params);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ id: +id });
  }

  @Put('update-info')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Body() updateUserDto: UpdateUserDto, @CurrentUser() user: User) {
    return this.userService.update(user.id, updateUserDto);
  }
}
