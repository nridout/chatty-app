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
      // Listen for incoming messages
      this.socket.addEventListener('message', (event) => {
        console.log('Simulating incoming message', event.data);
        // Add new incoming messages to the list of messages in the data store
        const newMessage = JSON.parse(event.data)
        const messages = this.state.messages.concat(newMessage)
        // Update the state of the app component
        this.setState({ messages: messages })
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
        <ChatBar currentUser={this.state.currentUser.name} addMessage={this._addMessage} />
      </div>
    );
  }

  // Creates a new message object & sends to server
  // Resets state of username to submitted username
  _addMessage = (username, content) => {
    const newMessage = {
      type: 'incomingMessage',
      username: username,
      content: content,
    }
    this.socket.send(JSON.stringify(newMessage))
    this.setState({currentUser: { name: username } })
  }

}
export default App;

