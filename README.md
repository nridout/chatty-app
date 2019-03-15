Chatty App
=====================

A chat app with real-time functionality where the user does not have to reload the page in order to see updates. Primarily a client-side SPA built with ReactJS.

### Page Components

- a navbar header that includes a chatroom user count that updates in real time
- a chat log displaying messages and notificaions
- an input field to change your name and an input field to send a message

### Screenshots

!["Chatty App 1"](https://github.com/nridout/chatty-app/blob/master/docs/Chatty-app-1.png)
!["Chatty App 1"](https://github.com/nridout/chatty-app/blob/master/docs/Chatty-app-2.png)

### User Functionality

- When any connected user sends a chat message, all connected users receive and display the message
- When any connected user changes their name, all connected users are notified of the name change
- Users are assigned different colors for their usernames
- gifs, pngs and jpgs are accepted and rendered
- Page auto scrolls to bottom when a new message is recieved

### Stack

* Webpack with Babel
* JSX
* ES6
* Webpack dev server
* WebSockets using Node package ws on the server-side
* native WebSocket on client side
* ReactJS

### Dependencies

#### Chatty App

* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-server
* react
* react-dom
* eslint
* eslint-plugin-react

#### Chatty Server

* express
* ws
* uuid
* random-color

