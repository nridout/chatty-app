import React, {Component} from 'react'
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

// App component is responsible for the main application state
class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      currentUser: {name: 'Anonymous'},
      messages: [],
      userCount: 0
    };
  }

  componentDidMount() {
    this._scrollToBottom();

    setTimeout(() => {
      this.socket = new WebSocket('ws://localhost:3001')
      // Open WebSocket Connection
      this.socket.addEventListener('open', (event) => {
        console.log('Connected to server')
      })

      // Listen for incoming messages & notifications
      this.socket.addEventListener('message', (event) => {
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
          case 'incomingUserCount':
            this._updateUserCount(data)
          break
          default:
          throw new Error('Unknown event type ' + data.type)
        }
      })
    }, 3000);
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="userCount">{this.state.userCount} users online</div>
      </nav>
        <MessageList messages={this.state.messages} />
        {/* auto scroll to bottom of page */}
        <div style={{ float: 'left', clear: 'both' }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
        <ChatBar currentUser={this.state.currentUser.name} addMessage={this._addMessage} updateUsername={this._updateUsername} />
      </div>
    );
  }

  // Create a postMessage object & send to server
  _addMessage = (username, content) => {
    const newMessage = {
      type: 'postMessage',
      username: username,
      content: content,
    }
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
      this.socket.send(JSON.stringify(newNotification))
      this.setState({ currentUser: { name: username } })
    }
  }

  // Add new incoming messages to the list of messages in the data store
  _updateMessageList = (message) => {
    const messages = this.state.messages.concat(message)
    // Update the state of the app component
    this.setState({ messages: messages })
    this._scrollToBottom();
  }

  // Update the userCount
  _updateUserCount = (message) => {
    const count = message.count
    // Update the state of the userCount
    this.setState({ userCount: count })
  }

  // Scroll to the bottom of the page
  _scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

}
export default App;

