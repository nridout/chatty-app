import React, {Component} from 'react'
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

// App component is responsible for the main application state
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      currentUser: { name: 'Anonymous'},
      messages: []
    };
  }

  componentDidMount() {
    console.log('componentDidMount <App />')

    setTimeout(() => {
      this.socket = new WebSocket('ws://localhost:3001')
      // Open WebSocket Connection
      this.socket.addEventListener('open', (event) => {
        console.log('Connected to server')
      })
      // Listen for incoming messages & notifications
      this.socket.addEventListener('message', (event) => {
        console.log('Incoming data:', event.data);
        const data = JSON.parse(event.data)
        // Handle incoming message types
        switch(data.type) {
          case 'incomingMessage':
            data.type = 'message'
            this._updateMessageList(data)
          break
          case 'incomingNotification':
            data.type = 'notification'
            this._updateMessageList(data)
          break
          default:
          // Else, show error in console
          throw new Error('Unknown event type' + data.type)
        }
      })
    }, 3000);
  }

  render() {
    console.log('Rendering <App />')
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} addMessage={this._addMessage} updateUsername={this._updateUsername} />
      </div>
    );
  }

  // Create a postmessage object & send to server
  _addMessage = (username, content) => {
    const newMessage = {
      type: 'postMessage',
      username: username,
      content: content,
    }
    console.log('New message sent to server:', newMessage)
    this.socket.send(JSON.stringify(newMessage))
  }

  // If the user changes their username, send a postNotification to the server
  // Update the currentUser.name
  _updateUsername = (username) => {
    if (username !== this.state.currentUser.name) {
      const newNotification = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} has changed their name to ${username}`
      }
      console.log('New notification sent to server:', newNotification)
      this.socket.send(JSON.stringify(newNotification))
      this.setState({ currentUser: { name: username } })
    }
  }

  // Add new incoming messages to the list of messages in the data store
  _updateMessageList = (message) => {
    const messages = this.state.messages.concat(message)
    // Update the state of the app component
    this.setState({ messages: messages })
  }

}
export default App;

