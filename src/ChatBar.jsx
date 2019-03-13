import React, { Component } from 'react'

// Chatbar conponent renders Username and Content input fields
// Username value defaults to "Username" prop from app
// Username input and Content input fields accept values on enter,
// Reset state to trigger render, and pass values to the App Component
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
          value={this.state.username}
          placeholder={this.props.currentUser}
          onChange={this._handleUsernameChange}
          onKeyPress={this._handleUsernameKeyPress}
        />
        <input className="chatbar-message"
          value={this.state.content}
          placeholder="Type a message and hit ENTER"
          onChange={this._handleContentChange}
          onKeyPress={this._handleContentKeyPress}
         />
      </footer>
    )
  }

  // Handle username change event by updating the state
  _handleUsernameChange = (event) => {
    this.setState({ username: event.target.value})
  }

  // Handle username submission on Enter
  // Send the username to app & clear input value
  _handleUsernameKeyPress = (event) => {
    if (event.key == 'Enter') {
      console.log('enter press for Username! ')
      this.setState({ username: '' })
    }
  }

  // Handle new message content by updating the state
  _handleContentChange = (event) => {
    this.setState({ content: event.target.value })
  }

  // Handle new message submission on Enter
  // Send the username to app & clear input value
  _handleContentKeyPress = (event) => {
    if (event.key == 'Enter') {
      console.log('enter press for Content! ')
      this.setState({ content: '' })
    }
  }

}

export default ChatBar;


