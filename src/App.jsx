import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
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
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store*******NEW MESSAGE RECEIVED HERE??
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
        <ChatBar currentUser={this.state.currentUser.name} />
      </div>
    );
  }


  // Creates a new message object
  // _newMessage = ()

  // Generates a random message Id
  // _generateRandomId = () => {
  //   const id = Math.Floor(Math.Random() * (1, 000, 000 - 1) + 1)
  //   return id
  // }

}
export default App;

