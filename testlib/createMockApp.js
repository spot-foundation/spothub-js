import express from "express";
import expressPathsAsRoutes from "express-paths-as-routes";
import body_parser from "body-parser";
import multer from "multer";

import mock_data from "./fixtures/seed";

const createBaseApp = function () {
  const app = express();
  return app;
};

const createMockApp = function () {
  const app = createBaseApp();
  app.use(body_parser.json());
  app.use(body_parser.urlencoded({ extended: false }));
  app.use(multer({}).any());
  globalThis.MockData = mock_data;
  app.use(expressPathsAsRoutes(`${__dirname}/mockapi`));
  return app;
};

export default createMockApp;
