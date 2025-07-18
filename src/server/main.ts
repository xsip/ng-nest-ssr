import {NestFactory} from '@nestjs/core';
import type {NestExpressApplication} from '@nestjs/platform-express';
import {AppModule} from './app.module';
import {createNodeRequestHandler, isMainModule} from '@angular/ssr/node';

const app = await NestFactory.create<NestExpressApplication>(AppModule);
// if (isMainModule(import.meta.url)) {
console.log(process.env['PORT']);
await app.listen(process.env['PORT'] || 3000, () => {
  console.log(`NestJS server listening on http://localhost:${process.env['PORT'] || 3000}`);
}).catch(console.log);
// }

export const reqHandler = createNodeRequestHandler(app.getHttpAdapter().getInstance());
