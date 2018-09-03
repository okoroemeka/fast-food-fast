import http from 'http';
import app from '../app';

//  port for listening to request
const port = parseInt(process.env.PORT, 10) || 8080;
app.set('port', port);

// creating server
const server = http.createServer(app);

// server listening at port
server.listen(port, () => console.log(`listening on ${port}`));

export default server;
