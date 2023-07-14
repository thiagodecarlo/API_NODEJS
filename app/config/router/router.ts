import express from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';
import { container } from 'tsyringe';
import { PlantingCropController } from '../../controller/planting-crops.controller';
import { RuralProducerController } from '../../controller/rural-producer.controller';
import { TsyringeAdapter } from './tsyring-adapter';

export class Router {
  /**
   * Initialize a route to check service's health
   * @param app Express server instance
   */
  public static setExpress(app: express.Application) {
    // routing-controllers/Express powerUps
    // * authorizationChecker
    // * currentUserChecker

    const inversifyAdapter = new TsyringeAdapter(container);
    useContainer(inversifyAdapter);

    useExpressServer(app, {
      defaultErrorHandler: false,
      controllers: [RuralProducerController, PlantingCropController],
      //controllers:["./controller/**/*.js"] **alternative**
    });
  }
}
