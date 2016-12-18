import http from 'http';
import express from 'express';
import app from './app';

const expressApp = express();
app.extend(expressApp);

const port = parseInt(process.env.PORT, 10) || 8001;
expressApp.set('port', port);

const server = http.createServer(expressApp);
server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

// Exports expressApp for test.
export default expressApp;
