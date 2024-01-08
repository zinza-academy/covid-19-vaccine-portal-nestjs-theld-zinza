// module.ts - your module
import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { ImportExcelService } from './excel.service';

@Module({
  imports: [ConsoleModule],
  providers: [ImportExcelService],
})
export class ImportExcelModule {}
