import React, {Component} from 'react';

class ChatBar extends Component {


    constructor() {
      super();
      this.state = {name: '', text: ''}
    }

    handleNameChange = (e) => {
      this.setState({name: e.target.value})
    }

    handleTextChange = (e) => {
      this.setState({text: e.target.value})
    }

  render() {
    console.log("Rendering <ChatBar />");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser} type="text" value={this.state.name} onChange={this.handleNameChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" type="text" onKeyPress={this.props.handleKeyPress}/>
      </footer>
    );
  }
}

export default ChatBar;
