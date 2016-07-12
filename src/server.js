const http = require('http');
const handler = require('./handler.js');
const server = http.createServer(handler);

const port = 4000;

function startServer() {
  server.listen(process.env.PORT || port);
  console.log('.txt file has loaded and Server is running on: ' + port);
};

startServer();

module.exports = {
    startServer: startServer
};
