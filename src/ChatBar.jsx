import React, { Component } from 'react'

// Chatbar conponent renders Username and Content input fields
// Username value defaults to "Username" prop from app
// Username input and Content input fields accept values on enter,
// reset state to trigger render, and pass values to the App Component
class ChatBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      content: '',
    }
  }

  render() {
    console.log('Rendering <Chatbar />')
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
    const value = event.target.value
    const name = event.target.name
    this.setState({ [name]: value})
  }

  // On Enter, determine if username has changed,
  // send username & message content to server
  // & clear input by resetting state
  _handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      let username = (this.state.username || this.props.currentUser)
      let content = this.state.content
      this.props.addMessage(username, content)
      this.setState({ username: '', content: '' })
    }
  }

}

export default ChatBar;


