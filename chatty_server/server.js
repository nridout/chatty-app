// server.js

const express = require('express')
const SocketServer = require('ws').Server
const uuidv1 = require('uuid/v1')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`))

// Create the WebSockets server
const wss = new SocketServer({ server })

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected')
  // Handle incoming messages
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
    // Parse new message
    let parsedMessage = JSON.parse(message)
    // Set message with a uuid
    parsedMessage.id = uuidv1()
    switch (parsedMessage.type) {
      case 'postMessage':
        parsedMessage.type = 'incomingMessage'
        break;
      case 'postNotification':
        parsedMessage.type = 'incomingNotification'
        break;
      default:
        // Else, show error in console
        throw new Error('Unknown event type' + parsedMessage.type)
    }
    console.log('Message ready to send', parsedMessage)
    // Send new message to all connected clients
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(parsedMessage))
    })

  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});