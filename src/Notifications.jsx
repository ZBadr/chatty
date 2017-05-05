import React, {Component} from 'react';


class Notifications extends Component {
  render() {
    console.log("Rendering <Notifications/>");
    return (
      <div className="message system">
        <span>{this.props.content}</span>
      </div>
    );
  }
}

export default Notifications;