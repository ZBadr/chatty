import React, {Component} from 'react';
import Message from './Message.jsx';
import Notifications from './Notifications.jsx';


class MessageList extends Component {
  render() {
    console.log("from MessageList sending notification", this.props.notifications)
    return (
      <div>
        <div className="messages">
          { this.props.messages.map( message =>
            <Message key={message.id} {...message} />)
          }
        </div>
        <div className="message system">
          { this.props.notifications.map( notifications =>
            <Notifications key={notifications.id} {...notifications} />)
          }
        </div>
      </div>
    );
  }
}
export default MessageList;


