import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Province } from 'src/entities/province.entity';
import { District } from 'src/entities/district.entity';
import { Ward } from 'src/entities/ward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
