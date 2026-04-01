import 'dotenv/config';
import 'colors';

import Server from './models/server.js';

const server = new Server();

server.execute();
