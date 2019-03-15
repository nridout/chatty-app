// server.js

const express = require('express')
const SocketServer = require('ws').Server
const uuidv1 = require('uuid/v1')
var randomColor = require('random-color')


// Set the port to 3001
const PORT = 3001

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`))

// Create the WebSockets server
const wss = new SocketServer({ server })

// Store user:color pairs in a object
const userColor = {};

// Reference string for image urls
const re = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i;

// When a client connects to the server they are assigned a socket,
// represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected')
  sendUpdatedUserCount(wss.clients.size)

  // Create a unique id for the new client
  // and pair the id with a random color
  const clientId = uuidv1()
  userColor[clientId] = randomColor().hexString()

  // Handle incoming messages
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
    // Parse new message
    let parsedMessage = JSON.parse(message)

    // Handle different message types
    switch (parsedMessage.type) {
      case 'postMessage':
        // Check if the incoming message content contains http:// && any of these: jpg, png, gif
        // If it does, add an image property to be rendered, and split the message from the url
        if (parsedMessage.content.match(re)) {
          const imgURL = re.exec(parsedMessage.content)
          const messageArr = parsedMessage.content.split(imgURL[0])
          parsedMessage.image = imgURL[0]
          parsedMessage.content = messageArr[0]
        }
        // Otherwise just update the type and send the unaltered content
        parsedMessage.type = 'incomingMessage'
        break
      case 'postNotification':
        parsedMessage.type = 'incomingNotification'
        break
      default:
        throw new Error('Unknown event type' + parsedMessage.type)
    }

    // Set message with a uuid
    parsedMessage.id = uuidv1()
    // Apply the user's color and attached to outgoing message
    parsedMessage.color = userColor[clientId]
    // Send new message to all connected clients
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(parsedMessage))
    })

  })


  // Set up a callback for when a client closes the socket.
  ws.on('close', () => {
    console.log('Client disconnected.')
    delete userColor[clientId];
    sendUpdatedUserCount(wss.clients.size)
  })

  // Function that sends the updated user count to the clients
  function sendUpdatedUserCount(count) {
    const userCount = {
      type: 'incomingUserCount',
      count: count
    }
    wss.clients.forEach(function each(client) {
      console.log('Sent num of users:', userCount)
      client.send(JSON.stringify(userCount))
    })
  }

})

