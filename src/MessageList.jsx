import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    return (
      <div className="messages">
        { this.props.messages.map( message => <Message key={message.id} {...message}/>) }
      </div>
    );
  }
}
export default MessageList;


