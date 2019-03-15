import React, { Component } from 'react';

class Message extends Component {
  render() {
    console.log('Rendering <Message />')
    // *** Think about how to "turn off" the username div when its a system message
    // *** Need to do the same for photos
    // if this.props.message.type, show this? else hide?
    const messageType = this.props.message.type
    const image = this.props.message.image
    const messageContent = this.props.message.content
    return (
      <div className={messageType}>
        <span className={messageType + '-username'} style={{color: this.props.message.color}}>{this.props.message.username}</span>
        <div className="message-group">
          { messageContent ? <span className={messageType + '-content'}> {messageContent} </span> : null }
          { messageContent && image ? <br></br> : null }
          { image ? <img className="image" src={image} /> : null}
        </div>
      </div>
    );
  }
}

export default Message;
