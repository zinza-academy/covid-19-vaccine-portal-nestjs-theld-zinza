// console.ts - example of entrypoint
import { BootstrapConsole } from 'nestjs-console';
import { ImportExcelModule } from './modules/importExcelModule/importExcel.module';

const bootstrap = new BootstrapConsole({
  module: ImportExcelModule,
  useDecorators: true,
});
bootstrap.init().then(async (app) => {
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
  } catch (e) {
    console.error(e);
    await app.close();
    process.exit(1);
  }
});
