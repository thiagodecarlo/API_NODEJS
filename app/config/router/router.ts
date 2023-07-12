import express from "express";
import {useExpressServer} from "routing-controllers";
import {RuralProducerController} from "../../controller/rural-producer.controller";

export class Router {
  /**
   * Initialize a route to check service's health
   * @param app Express server instance
   */
  public static setExpress(app: express.Application) {
    // routing-controllers/Express powerUps
    // * authorizationChecker
    // * currentUserChecker
    useExpressServer(app, {
      defaultErrorHandler: false,
      controllers: [RuralProducerController],
      //controllers:["./controller/**/*.js"] **alternative**
    });
  }
}
