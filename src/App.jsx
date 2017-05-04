import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


const data = {currentUser: {name: "Bob"},
              messages: [{id: 1, username: "Bob", content: "Has anyone seen my marbles?"},
                         {id: 2, username: "Anonymous", content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."}
                         ]}

class App extends Component {

constructor() {
    super();
    this.state = {currentUser: data.currentUser, messages: data.messages};
    this.socket = new WebSocket('ws://localhost:3001');
  }

  componentDidMount() {
    this.socket.onmessage = (event) => {
      console.log(event.data);
    }
    //console.log("Connected to server");
  }

handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      console.log("in handleKeyPress:", e.target.value);
      const newMessage = {id: this.state.messages.length + 1, username: this.state.currentUser.name, content: e.target.value}
      // let wsmessage = JSON.parse(newMessage)
      this.socket.send(JSON.stringify(newMessage));
      // const updatedMessage = this.state.messages.concat(newMessage)
      e.target.value = ''
      // this.setState({messages: updatedMessage})
    }
  }

render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <ChatBar currentUser={this.state.currentUser.name} handleKeyPress={this.handleKeyPress}/>
        <MessageList messages={this.state.messages}/>
      </div>
    );
  }
}


export default App;
