import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import {AngularNodeAppEngine, writeResponseToNodeResponse} from '@angular/ssr/node';

@Injectable()
export class AngularMiddleware implements NestMiddleware {
  angularApp = new AngularNodeAppEngine();

  use(req: Request, res: Response, next: NextFunction) {
      this.angularApp.handle(req)
      .then((response) =>
        response ? writeResponseToNodeResponse(response, res) : next(),)
      .catch(next);
  }
}
