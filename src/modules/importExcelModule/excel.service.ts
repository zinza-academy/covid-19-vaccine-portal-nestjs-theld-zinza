import { Console, Command } from 'nestjs-console';
import * as Excel from 'exceljs';
import DataSource from '../dataSource/dataSource.config';
import { Province } from 'src/entities/province.entity';
import { District } from 'src/entities/district.entity';
import { Ward } from 'src/entities/ward.entity';

type ProvinceType = {
  id: number;
  name: string;
};

type DistrictType = {
  id: number;
  name: string;
  provinceId: number;
};

type WardType = {
  id: number;
  name: string;
  districtId: number;
};

@Console()
export class ImportExcelService {
  @Command({
    command: 'import-address',
    description: 'Import addresses from xlsx file',
  })
  async listContent(): Promise<void> {
    const wb = new Excel.Workbook();
    const filePath = 'src/docs/VietNamAddressData.xlsx';

    await wb.xlsx.readFile(filePath).then(async () => {
      const ws = wb.getWorksheet('Sheet1');
      const provinces: ProvinceType[] = [];
      const districts: DistrictType[] = [];
      const wards: WardType[] = [];

      ws.eachRow({ includeEmpty: true }, function (row, index) {
        if (index <= 1) {
          return;
        }

        const data = row.values;

        if (!provinces[+data[2]]) {
          provinces[+data[2]] = {
            id: +data[2],
            name: data[1],
          };
        }

        if (!districts[+data[4]]) {
          districts[+data[4]] = {
            id: +data[4],
            name: data[3],
            provinceId: +data[2],
          };
        }

        wards.push({
          id: +data[6],
          name: data[5],
          districtId: +data[4],
        });
      });

      await DataSource.initialize();

      await DataSource.createQueryBuilder()
        .insert()
        .into(Province)
        .values(provinces)
        .execute();

      await DataSource.createQueryBuilder()
        .insert()
        .into(District)
        .values(districts)
        .execute();

      await DataSource.createQueryBuilder()
        .insert()
        .into(Ward)
        .values(wards)
        .execute();

      return;
    });
  }
}
