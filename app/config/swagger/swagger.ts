import express from 'express';
const YAML = require('yamljs');
var swaggerUi = require('swagger-ui-express');

export interface SwaggerDocsConfig {
  swaggerUiRoute?: string;
  swaggerJsonRoute?: string;
  swaggerYamlRoute?: string;
  swaggerFileLocation?: string;
}

export class SwaggerDocs {
  private static getDefaultConf(): SwaggerDocsConfig {
    const config: SwaggerDocsConfig = {
      swaggerUiRoute: '/api-docs',
      swaggerJsonRoute: '/api-docs.json',
      swaggerYamlRoute: '/api-docs.yaml',
      swaggerFileLocation: 'app/config/swagger/swagger.yaml',
    };
    return config;
  }

  /**
   * Initialize a route to check service's health
   * @param app
   * @param config
   */
  public static setExpress(
    app: express.Application,
    config: SwaggerDocsConfig = {}
  ) {
    const internalConfig = Object.assign(SwaggerDocs.getDefaultConf(), config);

    let swaggerDocument = YAML.load(internalConfig.swaggerFileLocation);

    app.use(internalConfig.swaggerUiRoute as string, swaggerUi.serve);

    app.use(
      internalConfig.swaggerUiRoute as string,
      swaggerUi.setup(swaggerDocument)
    );

    app.get(internalConfig.swaggerJsonRoute as string, (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerDocument);
    });

    const swaggerSpecYaml = YAML.stringify(swaggerDocument);

    app.get(internalConfig.swaggerYamlRoute as string, (req, res) => {
      res.setHeader('Content-Type', 'application/text');
      res.send(swaggerSpecYaml);
    });
  }
}
