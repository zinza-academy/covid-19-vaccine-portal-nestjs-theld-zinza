import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Get()
  findAll() {
    return this.addressService.findAllProvince();
  }

  @Get('p/:id')
  findDistrict(@Param('id') id: string) {
    return this.addressService.findDistrict(+id);
  }

  @Get('d/:id')
  findWard(@Param('id') id: string) {
    return this.addressService.findWard(+id);
  }
}
