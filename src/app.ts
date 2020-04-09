import express from 'express';
import cors from 'cors';

import routes from './routes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(routes);
  }
}

export default new App().app;
