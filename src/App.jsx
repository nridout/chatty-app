import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// App component is responsible for the main application state
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      currentUser: { name: 'Bob'},
      messages: [
        {
          id: 12345,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 23456,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        },
      ]
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      this.socket = new WebSocket('ws://localhost:3001')
      console.log('Connected to server')
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
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
        <ChatBar currentUser={this.state.currentUser.name} _addMessage={this._addMessage} socket={this.socket}/>
      </div>
    );
  }


  // Creates a new message object
  // _newMessage = (username, content)
  _addMessage = (username, content) => {
    const newMessage = {
      username: username,
      content: content,
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    }
    const prevMessageList = this.state.messages
    const newMessageList = [...prevMessageList, newMessage]
    this.setState({ messages: newMessageList });
  }



}
export default App;

