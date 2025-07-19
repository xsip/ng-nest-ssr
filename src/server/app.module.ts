import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'node:path';
import {AppController} from './app.controller';
import {AngularMiddleware} from './angular.middleware';

const browserDistFolder = join(import.meta.dirname, '../browser');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: browserDistFolder,
    }),
  ],
  exports: [],
  providers: [],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AngularMiddleware)
      .forRoutes('*')
  }
}
