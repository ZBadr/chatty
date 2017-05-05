import uuidV4 from 'uuid/v4';
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


const data = {currentUser: {name: "Anonymous"},
              messages: [],
              notifications: []}

class App extends Component {

constructor() {
    super();
    this.state = data;
    this.socket = undefined;
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');


    this.socket.onmessage = (event) => {

      let message = JSON.parse(event.data);

      switch (message.type) {
        case "incomingMessage":
          let newM = this.state.messages.concat(message)
          this.setState({messages: newM})
          break;
        case "incomingNotification":
        console.log("Notification: ", message);
          let newN = this.state.notifications.concat(message)
          this.setState({notifications: newN})
          break;
        default:
         throw new Error("Unknown Event Type: " + message.type);

      }

      console.log("Message: ", message);



    }
    //console.log("Connected to server");
  }

handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      if(e.target.className === 'chatbar-message') {
      console.log("in handleKeyPress:", e.target.value);
      const newMessage = {type: "postMessage", username: this.state.currentUser.name, content: e.target.value}
      // let wsmessage = JSON.parse(newMessage)
      console.log(newMessage)
      this.socket.send(JSON.stringify(newMessage));
      // const updatedMessage = this.state.messages.concat(newMessage)
      e.target.value = ''
      // this.setState({messages: updatedMessage})
      } else if(e.target.className === 'chatbar-username') {
        let ob = {}
        ob.type = "postNotification"
        ob.content = `${this.state.currentUser.name} has changed their name to ${e.target.value}`
        this.setState({currentUser: {name: e.target.value}})
        this.socket.send(JSON.stringify(ob));
        //this.setState({notifications: ob})

      }
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
        <MessageList  messages={this.state.messages}
                      notifications={this.state.notifications}
                      />
      </div>
    );
  }
}


export default App;
