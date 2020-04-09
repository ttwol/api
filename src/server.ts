import 'dotenv/config';
import 'reflect-metadata';

import app from './app';
import { connection } from './database/connection';

export const startServer = async () => {
  await connection();
  const application = app.listen(
    process.env.NODE_ENV === 'test'
      ? process.env.PORT_TEST
      : process.env.PORT_DEV,
    () => {
      console.log(`Server is running on localhost:${process.env.PORT_DEV}!`);
    }
  );

  return application;
};

startServer();
