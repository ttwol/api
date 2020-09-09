import 'reflect-metadata';
import { IServer } from 'recife';
import { appConnection } from './database/appConnection';

class Server implements IServer {
  beforeStarted() {
    appConnection();
  }

  started() {  }

  beforeMounted() {  }

  mounted() {  }

  beforeUpdated() {  }

  updated() {  }

  catch(e: any) { 
    console.log(e);
   }
}

export default Server;
