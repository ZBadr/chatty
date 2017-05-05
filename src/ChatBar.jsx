import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <ChatBar />");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" name="input1" placeholder={this.props.currentUser} type="text"  onKeyPress={this.props.handleKeyPress}/>
        <input className="chatbar-message" name="input2" placeholder="Type a message and hit ENTER" type="text" onKeyPress={this.props.handleKeyPress}/>
      </footer>
    );
  }
}

export default ChatBar;
