import 'colors';
import cors from 'cors';
import express, { Express } from 'express';
import fs from 'fs';
import http from 'http';
import https, { createServer } from 'https';
import routerBase from '../routes/base.route.js';
import routerAuth from '../routes/auth.route.js';

class Server {
    private app: Express;
    private server: http.Server | https.Server;
    public port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(`${process.env.PORT}`);
        this.server =
            process.env.ENVIRONMENT == 'productivo'
                ? createServer(
                      {
                          cert: fs.readFileSync('/cert/ssaver.gob.mx.crt'),
                          key: fs.readFileSync('/cert/ssaver.gob.mx.key'),
                      },
                      this.app,
                  )
                : http.createServer(this.app);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({ origin: '*' }));
        this.app.use('/', routerBase);
        this.app.use('/api/v1/auth', routerAuth);
    }

    execute() {
        this.middlewares();
        this.server.listen(this.port, () => {
            process.env.ENVIRONMENT == 'production'
                ? console.log(
                      `Server Settings ready in https://redis.ssaver.gob.mx:${this.port}`.america,
                  )
                : console.log(`Server Settings ready in http://localhost:${this.port}`.rainbow);
        });
    }
}

export default Server;
