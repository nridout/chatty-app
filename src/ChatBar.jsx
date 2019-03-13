import React, { Component } from 'react'

// Chatbar conponent renders Username and Content input fields
// Username value defaults to "Username" prop from app
// Username input and Content input fields accept values on enter,
// reset state to trigger render, and pass values to the App Component
class ChatBar extends Component {

  constructor(props) {
    super(props)
    // set the initial state of the username & content as null
    this.state = {
      username: '',
      content: ''
    }
  }

  render() {
    // Console Log render of Chatbar component
    console.log('Rendering <Chatbar />')
    console.log(this.state)
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          name="username"
          value={this.state.username}
          placeholder={this.props.currentUser}
          onChange={this._handleInputChange}
          onKeyPress={this._handleKeyPress}
        />
        <input className="chatbar-message"
          name="content"
          value={this.state.content}
          placeholder="Type a message and hit ENTER"
          onChange={this._handleInputChange}
          onKeyPress={this._handleKeyPress}
         />
      </footer>
    )
  }

  // Handle input change by updating username & content state
  _handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({ [name]: value})
    console.log(this.state)
  }

  // Handle message submission on Enter
  // Send the username to app & clear input value
  _handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // this.props.newMessage(this.state.username, this.state.content)
      console.log('Message submitted!')
      this.setState({ username: '', content: '' })
    }
  }

}

export default ChatBar;


