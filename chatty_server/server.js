const express = require('express');
const SocketServer = require('ws').Server;
const uuidV4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// this function broadcasts the message passed to it to all connected clients
function broadcast(msg) {
  wss.clients.forEach( c => {
    c.send(msg);
  })
}

wss.on('connection', (ws) => {
  
  console.log('Client connected');

  ws.on('message', (rawMessage) => {
    let message = JSON.parse(rawMessage);
    if(message.type === "postMessage") {
      let id = uuidV4()
      message.type = "incomingMessage"
      message.id = id
      broadcast(JSON.stringify(message));

    } else if(message.type === "postNotification") {
      let id = uuidV4()
      message.type = "incomingNotification"
      message.id = id
      broadcast(JSON.stringify(message));
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
