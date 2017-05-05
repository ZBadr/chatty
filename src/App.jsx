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
    // open a websocket connection everytime a component is loaded into the DOM
    this.socket = new WebSocket('ws://localhost:3001');


    this.socket.onmessage = (event) => {

      let message = JSON.parse(event.data);
      switch (message.type) {

        // if message.type is "incoming message" then we add that message object to the array of messages
        case "incomingMessage":
          let newM = this.state.messages.concat(message)
          this.setState({messages: newM})
          break;

        // if message.type is "incoming notification" then we add that message object to the array of notifications
        case "incomingNotification":
          let newN = this.state.notifications.concat(message)
          this.setState({notifications: newN})
          break;

        default:
        // if message.type is anythig else, we throw an error
         throw new Error("Unknown Event Type: " + message.type);
      }
      console.log("Message: ", message);
    }
  }

handleKeyPress = (e) => {
    // this function is the connection between the parent (App) and it's children
    if (e.key == 'Enter') {
      /* if the enter is pressed from the chatbar message box, type is added to the message object, username is set
      to the current state and content is updated to the value of what's typed into the message box*/
      if(e.target.className === 'chatbar-message') {
          const newMessage = {type: "postMessage", username: this.state.currentUser.name, content: e.target.value}
          this.socket.send(JSON.stringify(newMessage));
          e.target.value = ''
      } else
      /* if the enter is pressed from the username box, type is added to the notifications object, and
      a message alert is added to the content of the object. The state is updated to the value typed into the box*/
      if(e.target.className === 'chatbar-username') {
          let ob = {}
          ob.type = "postNotification"
          ob.content = `${this.state.currentUser.name} has changed their name to ${e.target.value}`
          this.setState({currentUser: {name: e.target.value}})
          this.socket.send(JSON.stringify(ob));
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
