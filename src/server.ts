import 'dotenv/config';
import 'reflect-metadata';

import app from './app';
import { connection } from './database/connection';

export const startServer = async () => {
  await connection();
  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(`Server is running on localhost:${port}!`);
  });
};

startServer();
