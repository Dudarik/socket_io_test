import express from 'express';
import path from 'path';
import { Server } from 'socket.io';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createSocket } from './socket/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 7000;

app.get('/api', (req, res) => {
  return res.status(200).json({ message: 'All ok' });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

createSocket(
  new Server(
    (() =>
      app.listen(SERVER_PORT, () => {
        console.log(`server start on port: ${SERVER_PORT}`);
      }))()
  )
);
